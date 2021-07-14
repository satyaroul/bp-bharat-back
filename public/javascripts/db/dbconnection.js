
'user strict';
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'satyaroul92',
  database: 'StockDB',
  port: "3306"
//   insecureAuth : true
})

connection.connect(function(err) {
    if (!err){
        console.log('DB connected!!')
    } else {
        throw err
        console.log('DB connection error!!')
    }
});

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
module.exports = connection;
