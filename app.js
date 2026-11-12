require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//const cors = require("cors");
//const { errors } = require("celebrate");
//const routes = require("./routes");
//const errorHandler = require("./middlewares/error-handler");
//const { requestLogger, errorLogger } = require("./middlewares/logger");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/newexplorer")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch();

app.use(express.json());
app.use("/users", userRouter);
app.use(authRouter);

// app.use(cors());
// app.use(requestLogger);
// app.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Server will crash now");
//   }, 0);
// });
// app.use(routes);
// app.use(errorLogger);
// app.use(errors());
// app.use(errorHandler);

app.listen(PORT, () => {});
