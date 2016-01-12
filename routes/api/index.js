/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-11 17:04:17
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-12 12:52:14
 */

var express = require('express');
var router = express.Router();
var errorMap = require('../../models/error-map.js');
var adminUser = require('../../models/mysql/admin-user.js');

/* GET users listing. */
router.post('/admin/login', function(req, res, next) {
    adminUser.getUserInfo(req.body.uname, function (err, results) {
        if (results.length !== 1) {
            return res.json(errorMap.unameNotExist);
        }
        var userInfo = results[0];
        if (userInfo.count > 5 && new Date().getTime() - userInfo.timestamp < 24 * 60 * 60 * 1000) {
            res.json(errorMap.passwdIncorrectOver);
        } else if (req.body.password !== userInfo.password) {
            var obj = Object.assign({}, errorMap.passwordIsIncorrect);
            obj = Object.assign(obj, {ret: 5 - userInfo.count});
            res.json(obj);
            adminUser.updateLoginCount(userInfo.count + 1, userInfo.id);
        } else {
            req.session.uname = userInfo.uname;
            res.json(errorMap.success);
            adminUser.updateLoginCount(0, userInfo.id);
        }
    });
});

module.exports = router;