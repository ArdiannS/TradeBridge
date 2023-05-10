const UserModel = require("../Models/UserModel");
const util = require("util");

class UserController {
  static async getAllUser(req, res) {
    var result = await UserModel.getUsers();
    if (result) {
      res.send(result);
    }
  }

  static async addUser(req, res) {
    const { username, password, email, date, userType } = req.body;
    try {
      const result = await UserModel.addUser(
        username,
        password,
        email,
        date,
        userType
      );
      console.log("++++++++++++++++++++");
      console.log(result);
      console.log("++++++++++++++++++++");
      req.session.userId = result.result.userid || 30;
      res
        .status(result.status)
        .json({ result: result.result, message: result.message });

      console.log(req.session);
      // console.log(req.session)
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      await UserModel.UserLogIn(username, password, res, req);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Something went wrong." });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy(() => {
        res.sendStatus(200);
      });
    } catch (exception) {
      console.log("An error happened!" + exception);
    }
  }
  static async getUsersById(req, res) {
    const { id } = req.params;
    try {
      const result = await UserModel.getUserById(id);
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving job");
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const result = await UserModel.deleteUser(id, res);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    const { username, password, email, date } = req.body;
    try {
      const result = await UserModel.updateUser(
        id,
        username,
        password,
        email,
        date,
        res
      );
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user");
    }
  }
}
module.exports = UserController;
