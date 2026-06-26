const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");


// =============================
// USER AUTHENTICATION ROUTES
// =============================


// Register new user
// POST http://localhost:5000/api/auth/register
router.post("/register", register);


// Login existing user
// POST http://localhost:5000/api/auth/login
router.post("/login", login);


module.exports = router;