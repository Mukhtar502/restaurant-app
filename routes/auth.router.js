const express = require("express");
const { registerUser, userLogin } = require("../controllers/auth.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/login", userLogin);

module.exports = userRouter;
