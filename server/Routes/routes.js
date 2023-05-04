const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");
const router = express.Router();

const { isLoggedIn, isGuest } = require("../middelware/auth");

router.get("/route", (req, res, next) => {
  req.session.userName = 'Aditya@123';
  res.send("hello");
});

router.get("/users", isLoggedIn, UserController.getAllUser);
router.post("/signup", UserController.addUser);
router.post("/signin", UserController.login);
router.post("/logout", UserController.logout)
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.post("/postjobs", ProductController.insertJobs);
router.get("/jobs", ProductController.getJobs);

module.exports = router;
