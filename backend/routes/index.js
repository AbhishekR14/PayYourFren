const express = require("express");
const userRouter = require("./users");
const accountsRouter = require("./account");
const axios = require("axios");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountsRouter);
rootRouter.get("/wakeup", async (req, res) => {
  res.status(200).send("API is awake");
});

module.exports = rootRouter;
