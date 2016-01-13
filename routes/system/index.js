/**
 * @file 管理后台入口
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-11 12:13:58
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-13 10:28:39
 */

var express = require('express');
var router = express.Router();

router.get('/*', function (req, res, next) {
    if (req.session.uname || req.path === '/admin') {
        next();
    } else {
        res.redirect('/system/admin');
    }
});

router.get('/home', function (req, res, next) {
    res.render('system/home', {
        title: '管理平台-首页',
        uname: req.session.uname
    });
});

router.get('/admin', function (req, res, next) {
    if (req.session.uname) {
        res.redirect('/system/home');
    } else {
        res.render('system/admin', { title: '管理平台-登录' });
    }
});

module.exports = router;