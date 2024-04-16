const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;      //change made while using https://payyourfren.onrender.com/ API

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT);

module.exports = app;
