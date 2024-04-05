const express = require("express");
const cors = require("cors");
import rootRouter from "./routes/index";
const app = express();
const PORT = 3000;

app.use("/api/v1", rootRouter);
app.use(cors());
app.use(express.json());

app.listen(PORT);
