const express = require("express");
const cors = require("cors");
const routers = require("./router");
const cookieParser = require("cookie-parser");
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
    // this.app.use(cors({ origin: "*" }));

    // this.app.use(
    //   cors({
    //     origin: [
    //       "http://localhost:5173",
    //       "https://united-study-3b5ea.web.app",
    //       "https://united-study-3b5ea.firebaseapp.com",
    //     ],
    //     credentials: true,
    //   })
    // );

    const allowedOrigins = new Set([
      "https://united-study-3b5ea.web.app",
      "https://united-study-3b5ea.firebaseapp.com",
      "http://localhost:5173",
    ]);
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (allowedOrigins.has(origin ?? "") || !origin) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "20mb" }));
    this.app.use(cookieParser());
  };

  run = () => {
    this.app.listen(this.port, () => {
      console.log(`Server http://localhost:${this.port}`);
    });
  };
}

module.exports = { App };
