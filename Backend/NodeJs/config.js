const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: 'semi1-practica1.c3jtrtivurz0.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'Semi1Grupo12023',
  database: 'Semi1_G1',
  multipleStatements: true
});

conn.connect(function (err) {
  if (err) {
    console.log(`DB not connected, ' + ${err.stack}`);
    return;
  }
    console.log('correct, DB connected.');
});

module.exports = conn;
