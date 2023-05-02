const database = require("../Configuration/DataBaseConnection");
const bcrypt = require("bcrypt");
const session = require("../Routes/routes.js");
// class UserModel {
// static async getUsers() {
//   return new Promise((resolve) => {
//     database.query("Select * From Users", [], (error, result) => {
//       if (!error) resolve(result);
//     });
//   });
// }
// static async addUser(username, password, email, birthday, usertype, res) {
//   return new Promise((resolve) => {
//     const sqlSelect = `SELECT * FROM Users WHERE username = ? OR email = ?`;
//     database.query(sqlSelect, [username, email], (err, results) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       if (results?.length > 0) {
//         if (typeof res !== "undefined") {
//           res.status(409).send("User already exists");
//         }
//       } else {
//         bcrypt.hash(password, 10, (err, hashedPassword) => {
//           if (err) {
//             return console.error(err.message);
//           }
//           database.query(
//             "Insert into Users(username,passwordi,email,birthday,usertype) values(?,?,?,?,?)",
//             [username, hashedPassword, email, birthday, usertype],
//             (error, result) => {
//               if (!error) {
//                 resolve(true);
//               } else {
//                 resolve(false);
//               }
//             }
//           );
//         });
//       }
//     });
//   });
// }

class UserModel {
  static async getUsers() {
    return new Promise((resolve) => {
      database.query("SELECT * FROM Users", [], (error, result) => {
        if (!error) {
          // Convert birthdate string to Date object and format without time zone
          result.forEach((row) => {
            row.birthdate = new Date(row.birthdate).toLocaleDateString([], {
              timeZone: "UTC",
            });
          });
          resolve(result);
        }
      });
    });
  }

  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM Users WHERE userid = ?",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
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
    try {
      const [rows] = await database.query(
          "SELECT userid, username, passwordi FROM Users WHERE username = ?",
          [username]
      );

      console.log('rows ---------------- ',rows)

      if (rows.length === 0) {
        return res.status(404).json({ message: "Nuk ekziston nje perdorues me kete username" });
      }

      const user = rows[0];
      const hashedPasswordFromDB = user.passwordi;

      const passwordMatches = await bcrypt.compare(password, hashedPasswordFromDB);
      if (!passwordMatches) {
        return res.status(401).json({ message: "Passwordi qe keni shtypur nuk eshte i sakte" });
      }

      delete user.passwordi;
      return user;
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error fetching user from database" });
    }
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
