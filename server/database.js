const {createPool} =require("mysql");
const express = require("express");
const app = express();
const pool = createPool({
    host:"localhost",
    user:"Arbs",
    password:"root",
    database:"TradeBridgeDb",
    connectionLimit:10
})
pool.query(`Select * From users`,(err,result,fields) =>{
    if(err){
        return console.log(err);
  }
    return console.log(result);
});

app.post('/signin', (req, res) => {
    // Extract user data from the POST request
    const { username, password } = req.body;
  
    // Build a SQL INSERT statement
    const sql = `INSERT INTO users (id, username, password) VALUES (2, ?, ?)`;
  
    // Execute the INSERT statement with user data
    pool.query(sql, [ username, password], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      // Return success response to the client
      res.send('User created successfully');
    });
  });
  app.listen(5000, () => {
    console.log('Server started on port 3000');
  });