const CommentModel = require("../Models/CommentModel");

class CommentController {
  static async insertComment(req, res) {
    const { commentContent, jobId,userId  } = req.body;

    const result = await CommentModel.addComent(commentContent, jobId, userId);
    if (result) {
      return res.redirect("/jobsearch");
    }
    res.status(400).json({ message: "error" });
  }
  static async getComments(req, res) {
    var result = await CommentModel.getAllComments();
    if (result) {
      res.send(result);
    }
  }
  static async getCommentsById(req, res) {
    const id = req.params.id;
    var result = await CommentModel.getCommentById(id);
    if (result) {
      res.send(result);
    }
  }

  static async getCommentsByJobId(req, res) {
    const jobId = req.params.id;
    //console.log(jobId);
    var result = await CommentModel.getCommentsByJobId(jobId);
    if (result) {
      res.send(result);
    }
  }
  static async updateComment(req, res) {
    const {commentContent} = req.body;
    //console.log(commentContent);
    const {id} = req.params;
    //console.log(id);
    var result = await CommentModel.updateComment(commentContent,id);
    if (result) {
      res.send(result);
    }
  }
  static async deleteComment(req, res) {
    const { id } = req.params;
    //console.log("this " , id);
    try {
      const result = await CommentModel.deleteComment(id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting comment");
    }
  }
}
module.exports = CommentController;
