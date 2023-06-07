const database = require("../Configuration/DataBaseConnection");
const { deleteMyJob } = require("../Controllers/ProductController");

class ProductModel {
  static async insertJobs(
    jobTitle,
    jobDescription,
    jobType,
    jobCategory,
    jobCity,
    jobPhoto,
    idUser
  ) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO Jobs(jobTitle,jobDescription, jobType, jobCategory, jobCity,jobPhoto,idusers) VALUES (?, ?, ?, ?,?,?,?)",
        [
          jobTitle,
          jobDescription,
          jobType,
          jobCategory,
          jobCity,
          jobPhoto,
          idUser,
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
  static async insertJobOffer(idUser, jobId, jobPrice, bidDescription) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO jobOffer(idusers,jobid, jobOffer,bidDescription,bidTime) VALUES (?, ?, ?, ?, NOW())",
        [idUser, jobId, jobPrice, bidDescription],
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
      database.query(
        "SELECT * FROM Jobs j inner join Users u on u.userid = j.idusers",
        [],
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
  static async getJobOffersByJobId(id) {
    return new Promise((resolve, reject) => {
      database.query(
        "Select * From jobOffer o inner join Users u on u.userid = o.idusers  where o.jobid = ? order by bidTime desc LIMIT 3",
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
  static async getAllJobOffers(id) {
    return new Promise((resolve, reject) => {
      database.query("Select * From jobOffer ", [], (error, result) => {
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
  static async getJobsByCategory(category) {
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
  static async deleteJobOffer(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From jobOffer where idoffer = ?",
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
    jobCity
  ) {
    return new Promise((resolve) => {
      database.query(
        "Update Jobs set jobTitle=?, jobType=?, jobCategory=?, jobDescription=?, jobCity=? where jobId = ?",
        [jobTitle, jobType, jobCategory, jobDescription, jobCity, jobId],
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
  static async updateJobOffers(jobOffer, bidDescripition, idoffer) {
    return new Promise((resolve) => {
      database.query(
        "Update joboffer set jobOffer=?,bidDescription = ?,bidTime = NOW()  where idoffer = ?",
        [jobOffer, bidDescripition, idoffer],
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

  static async getJobsByUserId(userId) {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM jobs WHERE idusers = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  }

  static async deleteMyJob(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From jobs where idusers = ?",
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

  static async searchJobsByTitle(title) {
    const query = "SELECT * FROM jobs WHERE title LIKE ?";
    const searchTitle = `%${title}%`;
    try {
      const [rows] = await database.query(query, [searchTitle]);
      return rows;
    } catch (error) {
      throw new Error(`Error searching jobs: ${error.message}`);
    }
  }
}
module.exports = ProductModel;
