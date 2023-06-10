const UserModel = require("../Models/UserModel");
const util = require("util");
const fs = require("fs");

class UserController {
  static async getAllUser(req, res) {
    var result = await UserModel.getUsers();
    if (result) {
      res.send(result);
    }
  }

  static async addUser(req, res) {
    const { username, password, email, date, userType } = req.body;
    const pathToImage = "./uploads/182145777.jpg";
    const buffer = fs.readFileSync(pathToImage);
    const defaultPicture = buffer.toString("base64");

    try {
      const result = await UserModel.addUser(
        username,
        password,
        email,
        date,
        userType,
        defaultPicture
      );
      console.log("++++++++++++++++++++");
      if (result) {
        console.log(result);

        console.log("+++++++++++++++++result+++");
      }
      console.log(result.result);
      req.session.userid = result.result.userid || 30;
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
    const { username, password, email, birthday } = req.body;
    try {
      const result = await UserModel.updateUser(
        id,
        username,
        password,
        email,
        birthday,
        res
      );
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user");
    }
  }

  static async getUserProfile(req, res) {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = await UserModel.getUserById(userId);

      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async updateUserProfile(req, res) {
    const { username, email, birthday } = req.body;
    const userId = req.session.userId;
    const  file  = req.file;
    let picture = null;
    if(file){
      const fileContent = file.buffer.toString("base64");
      picture = fileContent;
    }else{
      picture = req.body.defaultProfilePic;
      console.log(picture);
    }

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      await UserModel.updateUserProfile(userId, username, email, birthday,picture);
      res.json({ message: "User profile updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
module.exports = UserController;
