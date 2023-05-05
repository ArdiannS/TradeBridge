const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");
const CommentController = require("../Controllers/CommentController");

const router = express.Router();

const { isLoggedIn, isGuest } = require("../middelware/auth");


router.get("/users", isLoggedIn, UserController.getAllUser);
router.post("/signup", UserController.addUser);
router.post("/signin", UserController.login);
router.post("/logout", UserController.logout);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.post("/postjobs", ProductController.insertJobs);
router.get("/jobs", ProductController.getJobs);
router.get("/jobs/:id", ProductController.getJobById);
router.put("/jobs/:id", ProductController.updateJob);
router.delete("/jobs/:id", ProductController.deleteJob);
router.get("/users/:id", UserController.getUsersById);
router.post("/edituser/:id", UserController.updateUser);
router.post("/editjobs/:id", ProductController.updateJob);
router.delete("/users/:id", UserController.deleteUser);
router.post("/commentForm", CommentController.insertComment);
router.get("/comments", CommentController.getComments);
router.get("/comments/:id", CommentController.getComments);
router.post("/editcomment/:id", CommentController.updateComment);
router.delete("/comments/:id", CommentController.deleteComment);

module.exports = router;
