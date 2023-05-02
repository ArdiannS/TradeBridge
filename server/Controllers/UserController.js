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
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const result = await UserModel.UserLogIn(username, password, res, req);
      console.log(`User ${result.username} logged in successfully.`);
      // res.status(200).json({ message: 'Miresevini', user: result.user });
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
