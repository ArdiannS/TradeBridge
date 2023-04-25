var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TradeBridgeDb",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection succesful...");
});

conn.query("select * from users", (err, res) => {
  return console.log(res);
});
