const express = require("express");
const userRouter = require("./user.router");
const assignmentRouter = require("./assignment.router");
const submissionRouter = require("./submission.router");
const quoteRouter = require("./quote.router");

const authenticationRouter = require("./authentication.router");
const esMiddleware = require("../middleware/middleware");
const contactController = require("../controller/contact.controller");
const contactRouter = require("./contact.router");

function routers(app) {
  app.use("/api/users", userRouter);
  app.use("/api/assignments", assignmentRouter);
  app.use("/api/submissions", esMiddleware.isAuthorize, submissionRouter);
  app.use("/api/quotes", quoteRouter);
  app.use("/api/auth", authenticationRouter);
  app.use("/api/messages", contactRouter);

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
}

module.exports = routers;
