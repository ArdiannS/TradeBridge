const RequestModel = require("../Models/RequestsModel");
class RequestsController {
  static async insertRequest(req, res) {
    const { email, request } = req.body;

    try {
      await RequestModel.insertRequest(email, request);
      res.redirect("/jobsearch");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding Offer");
    }
  }
  static async deleteRequest(req, res) {
    const { id } = req.params;
    try {
      const result = await RequestModel.deleteRequest(id, res);
      res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting Offer");
    }
  }

  static async getRequests(req, res) {
    try {
      const result = await RequestModel.getAllRequests();
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving requests");
    }
  }

  static async getRequestsById(req, res) {
    const { id } = req.params;
    try {
      const result = await RequestModel.getRequestsById(id);
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving requests");
    }
  }
}

module.exports = RequestsController;
