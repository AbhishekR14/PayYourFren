const express = require("express");
import { Account } from "../db";
import { authMiddleware } from "../middlewares";

const accountsRouter = express.router();

accountsRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (account) {
    return res.status(200).send({
      balance: account.balance,
    });
  }
});

accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId });
  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  res.json({
    message: "Transfer successful",
  });
});

export default accountsRouter;
