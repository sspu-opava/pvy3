'use strict';

var mysql=require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "it3"
  });
  
module.exports = connection;