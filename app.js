var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var userRouter = require("./routes/api/user");
var profilesRouter = require("./routes/api/profiles");

var app = express();

// connect to mongoose database

mongoose.connect(
  "mongodb+srv://app:4dQgv4avZNyyOP3G@cluster0-teyfd.mongodb.net/medium?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected to DataBase Medium");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profiles", profilesRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.json(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
