const database = require("../Configuration/DataBaseConnection");
class CommentModel {
  static async addComent(userid, jobid, commentContent) {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO comments(userid,jobid,commentContent) VALUES (?, ?, ?)",
        [userid, jobid, commentContent],
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
  static async deleteComment(id) {
    return new Promise((resolve) => {
      database.query(
        "Delete From Comments where commentId = ?",
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
          "Update comments set commentContent = ? where commentId = ?",
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
