const mySql = require("mysql");
const dbcon = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sql53537373',
    database: 'IotEthereum'
});
let retval = {};
dbcon.connect(function (err) {
    if (err) throw err;
    dbcon.query("SELECT * from user_data_tbl as a INNER  join transaction_tbl as b on a.user_account = b.user_account", function (err, result, fields) {
        if (err) throw err;

        console.log(result);
    });

});