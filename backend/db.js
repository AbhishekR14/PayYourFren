const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aranjan0288:96I3aYSeGRKPkZJj@payyourfrenbasic.h5a6onx.mongodb.net/PayYourFren"
);
const User = mongoose.model("Users", {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const Account = mongoose.model("Accounts", {
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User table
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = { User, Account };
