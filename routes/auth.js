const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
router.get('/register',(req,res)=>{
    res.render("register");
})
router.get('/login',(req,res)=>{
    res.render("login");
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
})
router.post('/register', register);
router.post('/login', login);
router.get("/",(req,res)=>{
    res.redirect("/register");
})

module.exports = router;
