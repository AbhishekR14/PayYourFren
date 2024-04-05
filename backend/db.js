const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aranjan0288:96I3aYSeGRKPkZJj@payyourfrenbasic.h5a6onx.mongodb.net/admin"
);
const User = mongoose.model("Users", {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

export default User;
