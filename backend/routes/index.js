const express = require("express");
import userRouter from "./users";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

export default rootRouter;
