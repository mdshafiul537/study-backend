const jwt = require("jsonwebtoken");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class EssentialMiddleware {
  isAuthorize = async (req, resp, next) => {
    const token = req.cookies?.token;

    if (esIsEmpty(token)) {
      resp.status(401).send(respFormat(null, "Unauthorized access!!", false));
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (!esIsEmpty(error)) {
        console.log("Authorize failed, ", error);
      }

      if (!esIsEmpty(decode)) {
        req.user = decode;
      } else {
        resp.status(401).send(respFormat(null, "Unauthorized access!!", false));
      }
    });

    next();
  };
}

const esMiddleware = new EssentialMiddleware();

module.exports = esMiddleware;
