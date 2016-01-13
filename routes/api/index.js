/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-11 17:04:17
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-13 13:05:05
 */

var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var errorMap = require('../../models/error-map.js');
var adminUser = require('../../models/mysql/admin-user.js');
var userActive = require('../../logic/email/user-active.js');

router.post('/auth/*', function (req, res, next) {
    if (req.session.uname) {
        next();
    } else {
        res.json(errorMap.unlogin);
    }
});

router.post('/auth/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();   // 创建上传表单
    form.encoding = 'utf-8';        // 设置编辑
    form.uploadDir = 'public/ufile';    // 设置上传目录
    form.keepExtensions = true;  // 保留后缀
    form.parse(req, function (err, fields, files) {
        var url = '';
        try {
            url = files.ufile.path.replace(/^public\//g, '/static/');
        } catch (e) {}
        var result = {url: url};
        if (url) {
            Object.assign(result, errorMap.success);
        } else {
            Object.assign(result, errorMap.uploadFail);
        }
        res.json(result);
    });
});

router.post('/user/active', function (req, res, next) {
    userActive.do(['pidan621@126.com', '753164006@qq.com'], function (err, info) {
        if (err) {
            res.json(errorMap.activeUserFail);
        } else {
            Object.assign(info, errorMap.success);
            res.json(info);
        }
    });
});

router.post('/admin/login', function (req, res, next) {
    adminUser.getUserInfo(req.body.uname, function (err, results) {
        if (results.length !== 1) {
            return res.json(errorMap.unameNotExist);
        }
        var userInfo = results[0];
        if (userInfo.count > 5 && new Date().getTime() - userInfo.timestamp < 24 * 60 * 60 * 1000) {
            res.json(errorMap.passwdIncorrectOver);
        } else if (req.body.password !== userInfo.password) {
            var result = {ret: 5 - userInfo.count};
            Object.assign(result, errorMap.passwordIsIncorrect);
            res.json(result);
            adminUser.updateLoginCount(userInfo.count + 1, userInfo.id);
        } else {
            req.session.uname = userInfo.uname;
            res.json(errorMap.success);
            adminUser.updateLoginCount(0, userInfo.id);
        }
    });
});

module.exports = router;