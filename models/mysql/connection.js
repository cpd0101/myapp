/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-12 10:57:37
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-12 12:17:31
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'tsh0721.'
});

var CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS my_app';

connection.query(CREATE_DATABASE, function (err, res) {
    if (err) throw err;
});

connection.changeUser({
    database: 'my_app'
}, function (err, res) {
    if (err) throw err;
});

module.exports = connection;
