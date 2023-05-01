const database = require("../Configuration/DataBaseConnection");

class ProductModel {
  static async insertJobs(
    jobTitle,
    jobDescription,
    jobType,
    jobCategory,
    jobCity,
    jobPrice
  ) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO Jobs(jobTitle,jobDescription, jobType, jobCategory, jobCity, jobPrice) VALUES (?, ?, ?, ?, ?,?)",
        [jobTitle, jobDescription, jobType, jobCategory, jobCity, jobPrice],
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
  static async getJobsById(id) {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM Jobs WHERE jobId = ?",
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
  static async deleteJob(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From Jobs where jobId = ?",
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
  static async updateJob(
    jobId,
    jobTitle,
    jobDescription,
    jobType,
    jobCategory,
    jobCity,
    jobPrice
  ) {
    return new Promise((resolve) => {
      database.query(
        "Update Jobs set jobTitle=?, jobDescription = ?,jobType=?,jobCategory = ?,jobCity=?,jobPrice=? where jobId = ?",
        [
          jobTitle,
          jobDescription,
          jobType,
          jobCategory,
          jobCity,
          jobPrice,
          jobId,
        ],
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
module.exports = ProductModel;
