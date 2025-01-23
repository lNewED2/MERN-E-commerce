const express = require("express");
const router = express.Router();
const UserController = require("../controller/User.controller");

//http://localhost:5000/api/v1/auth/register
router.post("/register");

//http://localhost:5000/api/v1/auth/login
router.post("/login", UserController.login);

module.express = router;