require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const NotFoundError = require("./errors/not-found-error");
const auth = require("./middlewares/auth");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const articleRouter = require("./routes/articles");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/newexplorer")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch();

app.use(express.json());
app.use(requestLogger);
app.use(authRouter);

app.use(auth);
app.use("/users", userRouter);
app.use("/articles", articleRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {});
