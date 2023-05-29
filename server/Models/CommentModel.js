const database = require("../Configuration/DataBaseConnection");
class CommentModel {
  static async addComent(commentContent, jobid, userid) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO comments(commentContent,jobid,userid) VALUES (?, ?, ?)",
        [commentContent, jobid, userid],
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

  static async getAllComments() {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM Comments", [], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  static async getCommentsByJobId(id) {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM Comments WHERE jobId = ?", [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  static async deleteComment(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From Comments where commentid = ?",
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
  static async updateComment(commentContent,id) {
    return new Promise((resolve) => {
      database.query(
          "Update Comments set commentContent = ? where commentid = ?",
          [commentContent,id],
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

module.exports = CommentModel;
