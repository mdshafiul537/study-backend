const express = require("express");
const cors = require("cors");
const routers = require("./router");
class App {
  app = undefined;
  port = process.env.PORT | 3051;
  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRouter();
  }

  initRouter = () => {
    routers(this.app);
  };

  initMiddleware = () => {
    this.app.use(cors());

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "20mb" }));
  };

  run = () => {
    this.app.listen(this.port, () => {
      console.log(`Server http://localhost:${this.port}`);
    });
  };
}

module.exports = { App };
