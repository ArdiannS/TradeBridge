const database = require("../Configuration/DataBaseConnection");

class ProductModel {
  static async insertJobs(
    jobTitle,
    jobDescription,
    jobType,
    jobCategory,
    jobCity,
    jobPrice,
    jobPhoto
  ) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO Jobs(jobTitle,jobDescription, jobType, jobCategory, jobCity, jobPrice,jobPhoto) VALUES (?, ?, ?, ?, ?,?,?)",
        [
          jobTitle,
          jobDescription,
          jobType,
          jobCategory,
          jobCity,
          jobPrice,
          jobPhoto,
        ],
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
  static async getNumberOfAllJobs() {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT COUNT(*) AS totalJobs FROM Jobs",
        [],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const totalJobs = result[0].totalJobs;
            resolve(totalJobs);
          }
        }
      );
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
  static async getSimilarJobs(category) {
    return new Promise((resolve, reject) => {
        database.query(
            "SELECT * FROM Jobs WHERE jobCategory = ? LIMIT 3",
            [category],
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
  static async getJobPhotoById(id) {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT jobPhoto FROM Jobs WHERE jobId = ?",
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
    jobType,
    jobCategory,
    jobDescription,
    jobCity,
    jobPrice
  ) {
    return new Promise((resolve) => {
      database.query(
        "Update Jobs set jobTitle=?, jobType=?, jobCategory=?, jobDescription=?, jobCity=?, jobPrice=?, idusers=null where jobId = ?",
        [
          jobTitle,
          jobType,
          jobCategory,
          jobDescription,
          jobCity,
          jobPrice,
          jobId,
        ],
        (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(result);
          resolve(result);
        }
      );
    });
  }
}
module.exports = ProductModel;