const express = require("express");
const  routers  = require("./router");
class App {
  app = undefined;
  port = process.env.PORT | 3051;
  constructor() {
    this.app = express();

    this.initRouter();
  }

  initRouter = () => {
    routers(this.app);
  };

  run = () => {
    this.app.listen(this.port, () => {
      console.log(`Server http://localhost:${this.port}`);
    });
  };
}

module.exports = { App };
