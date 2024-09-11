const express = require("express");
const userRouter = require( "./user.router" );

function routers(app) {
  app.use("/api/users", userRouter);

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
}

module.exports = routers;
