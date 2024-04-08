const express = require("express");
import userRouter from "./users";
import accountsRouter from "./account;

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountsRouter);

export default rootRouter;
