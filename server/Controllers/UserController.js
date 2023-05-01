const UserModel = require("../Models/UserModel");
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
      res.send("User added succesfully");
    }
  }
  static async logInSucces(req, res) {
    const { username, password } = req.body;
    try {
      const result = await UserModel.UserLogIn(username, password, res);
      if (result) {
        req.session.userid = result.userid;
        req.session.username = result.username;
        console.log(`User ${result.username} logged in successfully.`);
        
      }
    } catch (exception) {
      console.log("An error happened!" + exception);
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
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
  }
}
module.exports = UserController;
