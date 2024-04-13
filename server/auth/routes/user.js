const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controllers/auth");
const {auth,isStudent,isAdmin}= require("../middlewares/auth");


router.post("/login",login);
router.post("/signup", signup);

//protected Routes

module.exports = router;
