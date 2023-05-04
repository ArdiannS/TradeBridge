const UserModel = require("../Models/UserModel");
const util = require('util');

class UserController {
  static async getAllUser(req, res) {
    var result = await UserModel.getUsers();
    if (result) {
      res.send(result);
    }
  }

  static async addUser(req, res) {
    const { username, password, email, date, userType } = req.body;
    const result = await UserModel.addUser(
      username,
      password,
      email,
      date,
      userType,
      res,
      req
    );
    if (result) {
      req.session.userId = result[0].userid;
      return res.status(200).json({userData:result?.[0], message: "User added succesfully"})
    }
    res.status(400).json({message: "error"})

  }
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      await UserModel.UserLogIn(username, password, res, req);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Something went wrong.' });
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

  static async deleteUser(req, res) {
    const { id } = req.params;

    // TODO: DELETE THIS
    const currentUserId = req.session.userid;
    const user = database.query( "SELECT * FROM Users WHERE userid = ?", [currentUserId])
    if(user.userType === "admin") {
      // complete action
    } else {
      res.status(401).json({message: "You are not authorized to delete a user"});
    }

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
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
  }
}
module.exports = UserController;
