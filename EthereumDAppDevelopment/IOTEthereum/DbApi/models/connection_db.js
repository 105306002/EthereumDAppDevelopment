// DataBase
const config = require('../setting/dbConfig');
const mySql = require("mysql");
const connection = mySql.createConnection({
    host: `${config.mysql.host}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        //console.log('db connecting success');
    }
});

module.exports = connection;