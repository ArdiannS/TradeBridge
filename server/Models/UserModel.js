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
  static async addUser(
    username,
    password,
    email,
    birthday,
    usertype,
    userProfilePicture
  ) {
    return new Promise((resolve) => {
        database.query(
            "SELECT * FROM Users WHERE username = ? OR email = ?",
            [username, email],
            (error, result1) => {
                if (error) {
                    console.error(error.message);
                    resolve({status: 500, message: "There was an error"});
                }
                if (result1.length > 0) {
                    resolve({status: 404, message: "Vetem se ekziston nje perdorues me kete username apo email"});
                } else {
                    bcrypt.hash(password, 10, (err, hashedPassword) => {
                        if (err) {
                            resolve({status: 500, message: "Error hashing the password"});
                        } else {
                            database.query(
                            "INSERT INTO Users (username, password, email, birthday, usertype,userProfilePicture) values(?,?,?,?,?,?)",
                            [username, hashedPassword, email, birthday, usertype,userProfilePicture],
                            (error, result2) => {
                                if(error) {
                                    resolve({status: 500, message: "error"});
                                } else {
                                    database.query("SELECT * FROM Users WHERE username = ? OR email = ? LIMIT 1",
                                        [username, email], (error, result3) => {
                                            if(error) {
                                                console.log(error.message)
                                                resolve({status: 500, message: "error"});
                                            } else {
                                                let data = {...result3[0]};
                                                delete data.password;
                                                resolve({status: 200, result: data, message: "All good"});
                                            }
                                        })
                                }
                            });
                        }
                    });
                }
            }
        )
    });
  }

  static async UserLogIn(username, password, res, req) {
    return new Promise((resolve) => {
      resolve(
        database.query(
          "SELECT * FROM Users WHERE username = ?",
          [username],
          (error, result1) => {
            if (error) {
              return console.error(error.message);
            }
            if (result1.length === 0) {
              res.status(404).json({
                message: "Nuk ekziston nje perdorues me kete username",
              });
            } else {
              const existsTheUsername =
                "SELECT password FROM Users WHERE username = ? LIMIT 1";
              database.query(existsTheUsername, [username], (err, results2) => {
                if (err) {
                  return console.error(err.message);
                }
                const hashedPasswordFromDB = results2?.[0]?.password;
                bcrypt.compare(
                  password,
                  hashedPasswordFromDB,
                  (err, result) => {
                    if (err) {
                      return console.error(err.message);
                    }
                    if (!result) {
                      res.status(401).json({
                        message: "Passwordi qe keni shtypur nuk eshte i sakte",
                      });
                    } else {
                      const userData = result1;
                      req.session.userId = userData[0].userid;
                      res.status(200).json({ userData, message: "Miresevini" });
                    }
                  }
                );
              });
            }
          }
        )
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
        "Update Users set username = ?,password=?,email=?,birthday=? where userid = ?",
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
