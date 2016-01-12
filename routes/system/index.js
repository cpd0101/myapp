/**
 * @file 管理后台入口
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-11 12:13:58
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-11 21:05:13
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function(req, res, next) {
    if (req.session.uname) {
        res.redirect('/system/home');
    } else {
        res.render('system/admin', { title: '管理平台-登录' });
    }
});

router.get('/home', function(req, res, next) {
    if (req.session.uname) {
        res.render('system/home', {
            title: '管理平台-首页',
            uname: req.session.uname
        });
    } else {
        res.redirect('/system/admin');
    }
});

module.exports = router;