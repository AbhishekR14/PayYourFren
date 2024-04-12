const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middlewares");
const { default: mongoose } = require('mongoose');

const accountsRouter = express.Router();

accountsRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (account) {
    return res.status(200).send({
      balance: account.balance,
    });
  }
});

accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;
  session.startTransaction();
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer successful",
  });
});

module.exports = accountsRouter;
