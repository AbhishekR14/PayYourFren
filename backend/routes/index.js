const express = require("express");
const userRouter = require("./users");
const accountsRouter = require("./account");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountsRouter);

module.exports = rootRouter;
