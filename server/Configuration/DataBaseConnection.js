var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "Letovica1",
  database: "TradeBridgeDb",
  timezone: "c",
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection succesful...");
});
module.exports = conn;
