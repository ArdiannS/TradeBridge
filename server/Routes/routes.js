const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");
const CommentController = require("../Controllers/CommentController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const { isLoggedIn, isGuest } = require("../middelware/auth");
const DashboardController = require("../Controllers/DashboardController");
router.post(
  "/postjobs",
  upload.single("jobPhoto"),
  ProductController.insertJobs
);
// router.post(
//   "/editjobs",
//   upload.single("jobPhoto"),
//   ProductController.insertJobs
// );
router.post("/jobsearch",ProductController.insertOffer);

router.get("/users", isLoggedIn, UserController.getAllUser);
router.get("/users", UserController.getAllUser);
router.post("/signup", UserController.addUser);
router.post("/signin", UserController.login);
router.post("/logout", UserController.logout);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.post("/postjobs", ProductController.insertJobs);
router.get("/jobs", ProductController.getJobs);
router.post('/jobsearch', ProductController.getSimilarJobs);
router.get('/jobs/:category', ProductController.getJobByCategory);
router.get("/jobs/:id", ProductController.getJobById);
router.put("/jobs/:id", ProductController.updateJob);
router.delete("/jobs/:id", ProductController.deleteJob);
router.get("/users/:id", UserController.getUsersById);
router.post("/edituser/:id", UserController.updateUser);
router.post("/editjobs/:id", ProductController.updateJob);
router.delete("/users/:id", UserController.deleteUser);
router.post("/commentForm", CommentController.insertComment);
router.get("/comments", CommentController.getComments);
router.get("/comments/:id", CommentController.getCommentsByJobId);
router.post("/editcomment/:id", CommentController.updateComment);
router.delete("/comments/:id", CommentController.deleteComment);
router.get("/dashboard/total-jobs", DashboardController.getNumberOfAllJobs);
router.get("/dashboard/total-users", DashboardController.getNumberOfAllUsers);
router.get("/user/profile", UserController.getUserProfile);
router.get("/myjobs/:id", ProductController.getJobsByUserId);
router.put("/user/profile", UserController.updateUserProfile);
router.get("/jobs", ProductController.searchJobs);
router.get("/jobOffer/:id", ProductController.getJobOffers);

module.exports = router;
