const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");
class DashboardController {
  static async getNumberOfAllJobs(req, res) {
    try {
      const totalJobs = await ProductModel.getNumberOfAllJobs();
      if (totalJobs) {
        res.send(totalJobs.toString());
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving jobs");
    }
  }
  static async getNumberOfAllUsers(req, res) {
    try {
      const totalUsers = await UserModel.getNumberOfAllUsers();
      if (totalUsers) {
        res.send(totalUsers.toString());
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving Users");
    }
  }
}
module.exports = DashboardController;
