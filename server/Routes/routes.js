const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");

const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.get("/route", (req, res, next) => {
  res.send("hello");
});

router.get("/users", UserController.getAllUser);
router.post("/signup", UserController.addUser);
router.post("/signin", UserController.logInSucces);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.get("/jobs", ProductController.getJobs);
router.delete("/jobs/:id", ProductController.deleteJob);
router.put("/jobs/:id", ProductController.updateJob);
router.get("/jobs/:id", ProductController.getJobById);
router.post("/edituser/:id", UserController.updateUser);
router.post("/editjobs/:id", ProductController.updateJob);

router.post(
  "/postjobs",
  upload.single("jobPhoto"),
  ProductController.insertJobs
);
module.exports = router;
