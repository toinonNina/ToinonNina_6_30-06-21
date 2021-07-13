const mysql = require('mysql2');
require('dotenv').config();


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'groupomania'
});

// Test de la connection


conn.connect(
    function(err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        } else {
            console.log("Connection established.");
            //readData();
        }
    });
module.exports = conn;




//Test confirmation de connection
/*function readData() {
    conn.query('SELECT * FROM groupomania.user',
        function(err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');
        });
    conn.end(
        function(err) {
            if (err) throw err;
            else console.log('Closing connection.');
        });
};*/