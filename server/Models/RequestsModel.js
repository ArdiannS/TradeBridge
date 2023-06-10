const database = require("../Configuration/DataBaseConnection");

class RequestModel {
  static async insertRequest(email, request) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO Requests(email,request) VALUES (?, ?)",
        [email, request],
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

  static async deleteRequest(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From Requests where id = ?",
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

  static async getAllRequests() {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM Requests", [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  static async getRequestsById(id) {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM Requests WHERE id = ?",
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
}
module.exports = RequestModel;
