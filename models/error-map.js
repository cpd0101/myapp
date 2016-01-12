/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-11 17:43:24
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-12 21:54:09
 */

var map = {
    success: {
        errno: 0,
        msg: '成功'
    },
    paramsError: {
        errno: 1,
        msg: '参数错误'
    },
    unameNotExist: {
        errno: 2,
        msg: '用户名不存在'
    },
    passwordIsIncorrect: {
        errno: 3,
        msg: '密码输入错误'
    },
    passwdIncorrectOver: {
        errno: 4,
        msg: '您今天密码输入错误次数过多，请您在24小时后进行重试'
    },
    unlogin: {
        errno: 5,
        msg: '未登录'
    },
    uploadFail: {
        errno: 6,
        msg: '上传失败'
    }
};

module.exports = map;