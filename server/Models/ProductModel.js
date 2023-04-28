const database = require("../Configuration/DataBaseConnection");

class ProductModel {
    static async insertJobs(jobDescription, jobType, jobCategory, jobCity, jobPrice) {
        return new Promise((resolve, reject) => {
          database.query(
            "INSERT INTO Jobs(jobDescription, jobType, jobCategory, jobCity, jobPrice) VALUES (?, ?, ?, ?, ?)",
            [jobDescription, jobType, jobCategory, jobCity, jobPrice],
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
  static async getAllJobs() {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM Jobs", [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = ProductModel;