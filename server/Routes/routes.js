const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");

const router = express.Router();
const session = require("express-session");

const config = require("../Configuration/SessionConfig");
router.use(session({ secret: config.sessionSecret }));

const auth = require("../middelware/auth");

router.get("/route", (req, res, next) => {
  res.send("hello");
});

router.get("/users", UserController.getAllUser);
router.post("/signup", auth.isLogout, UserController.addUser);
router.post("/signin", UserController.logInSucces);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.post("/postjobs", ProductController.insertJobs);
router.get("/jobs", ProductController.getJobs);

module.exports = router;
