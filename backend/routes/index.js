const express = require("express");
const userRouter = require("./users");
const accountsRouter = require("./account");
const axios = require("axios");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountsRouter);
rootRouter.get("/wakeup", async (req, res) => {
  try {
    const response = await axios.get(
      "https://payyourfren.onrender.com/api/v1/user/getusername"
    );
    return res.status(200).send({
      message: "API Awake",
    });
  } catch (e) {
    return res.status(411).send({
      message: "API Awake",
    });
  }
});

module.exports = rootRouter;
