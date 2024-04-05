const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
import { User } from "../db.js";

const userRouter = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const userInfo = req.body;
  const { success } = signupBody.safeParse(userInfo);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const exsitingUser = await User.findOne({ username: userInfo.username });
  if (exsitingUser._id) {
    return res.status(411).send({ message: "Email already taken" });
  } else {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.status(200).send({
      message: "User created successfully",
      token: token,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const exsitingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  const userId = exsitingUser._id;
  if (exsitingUser._id) {
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.status(200).send({
      token: token,
    });
  } else {
    res.status(411).send({ message: "Error while logging in" });
  }
});

module.exports = userRouter;
