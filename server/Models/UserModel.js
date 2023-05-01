const database = require("../Configuration/DataBaseConnection");
const bcrypt = require("bcrypt");
const session = require("../Routes/routes.js");
class UserModel {
  static async getUsers() {
    return new Promise((resolve) => {
      database.query("Select * From Users", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async addUser(username, password, email, birthday, usertype, res) {
    return new Promise((resolve) => {
      const sqlSelect = `SELECT * FROM Users WHERE username = ? OR email = ?`;
      database.query(sqlSelect, [username, email], (err, results) => {
        if (err) {
          return console.error(err.message);
        }
        if (results?.length > 0) {
          if (typeof res !== "undefined") {
            res.status(409).send("User already exists");
          }
        } else {
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              return console.error(err.message);
            }
            database.query(
              "Insert into Users(username,passwordi,email,birthday,usertype) values(?,?,?,?,?)",
              [username, hashedPassword, email, birthday, usertype],
              (error, result) => {
                if (!error) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }
            );
          });
        }
      });
    });
  }

  static async UserLogIn(username, password, res, req) {
    return new Promise((resolve) => {
      database.query(
        "SELECT * FROM Users WHERE username = ?",
        [username],
        (error, result1) => {
          if (error) {
            return console.error(error.message);
          }
          if (result1.length === 0) {
            res.send("Ky user nuk ekziston");
          } else {
            const existsTheUsername =
              "SELECT passwordi FROM Users WHERE username = ?";
            database.query(existsTheUsername, [username], (err, results2) => {
              if (err) {
                return console.error(err.message);
              }
              const hashedPasswordFromDB = results2?.[0]?.passwordi;
              bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
                if (err) {
                  return console.error(err.message);
                }
                if (!result) {
                  res.send("Username ose Password eshte gabime");
                } else {
                  res.send("Sukses,MireSeVini!<3");
                }
              });
            });
          }
        }
      );
    });
  }
  static async deleteUser(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From Users where userid = ?",
        [id],
        (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          resolve(result);
        }
      );
    });
  }
  static async updateUser(id, username, password, email, birthday) {
    return new Promise((resolve) => {
      database.query(
        "Update Users set username = ?,passwordi=?,email,birthday=? where userid = ?",
        [username, password, email, birthday, id],
        (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          resolve(result);
        }
      );
    });
  }
}
module.exports = UserModel;
