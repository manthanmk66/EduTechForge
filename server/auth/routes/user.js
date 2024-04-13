const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Tests",
    })

})

//protected Routes

router.get("/student", auth,isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
})

router.get("/admin", auth,isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

module.exports = router;
