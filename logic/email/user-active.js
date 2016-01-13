/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-13 12:35:38
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-13 13:08:16
 */

var nodemailer = require('nodemailer');

exports.do = function (emails, callback) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://313896061%40qq.com:pass@smtp.qq.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '﹎o.臭皮蛋灬<313896061@qq.com>', // sender address
        to: emails.join(','), // list of receivers
        subject: 'Hello', // Subject line
        html: '<b>Hello world</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (typeof callback === 'function') {
            callback(error, info);
        }
        transporter.close();
    });
};