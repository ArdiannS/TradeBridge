const express = require("express");
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");

const router = express.Router();

router.get("/route",(req,res,next)=>{
    res.send("hello");
});

router.get("/users",UserController.getAllUser);
router.post("/signup",UserController.addUser);
router.post("/signin",UserController.logInSucces);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);
router.post("/postjobs",ProductController.insertJobs);



module.exports = router;
