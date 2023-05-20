const CommentModel = require("../Models/CommentModel");

class CommentController {
  static async insertComment(req, res) {
    const { commentContent, jobId,userId  } = req.body;

    const result = await CommentModel.addComent(commentContent, jobId, userId);
    if (result) {
      return res.status(200).json({ message: "Comment added succesfully" });
    }
    res.status(400).json({ message: "error" });
  }
  static async getComments(req, res) {
    var result = await CommentModel.getAllComments();
    if (result) {
      res.send(result);
    }
  }
  static async updateComment(req, res) {
    const {commentContent} = req.body;
    const {id} = req.params;
    var result = await CommentModel.updateComment(commentContent,id);
    if (result) {
      return res.status(200).json({ message: "Comment updated succesfully" });
    }
  }
  static async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const result = await CommentModel.deleteComment(id, res);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting comment");
    }
  }
}
module.exports = CommentController;
