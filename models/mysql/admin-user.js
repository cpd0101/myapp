/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-12 11:28:24
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-12 12:44:00
 */

var connection = require('./connection.js');

var CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS admin_user' +
    '(' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'uname varchar(16),' +
        'password char(32),' +
        'count tinyint NOT NULL DEFAULT 0,' +
        'timestamp timestamp,' +
        'PRIMARY KEY(id, uname)' +
    ')';

connection.query(CREATE_TABLE, function (err, res) {
    if (err) throw err;
});

exports.getUserInfo = function (uname, callback) {
    var sql = 'SELECT * FROM admin_user WHERE uname = ?';
    connection.query(sql, [uname], function (err, results) {
        if (typeof callback === 'function') {
            callback(err, results);
        }   
    });
};

exports.updateLoginCount = function (count, id, callback) {
    var sql = 'UPDATE admin_user SET count = ? WHERE id = ?';
    connection.query(sql, [count, id], function (err, results) {
        if (typeof callback === 'function') {
            callback(err, results);
        }   
    });
};
