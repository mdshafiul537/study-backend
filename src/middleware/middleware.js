const authenticationServices = require("../services/authentication.services");

class EssentialMiddleware {
  accessController = async (req, resp, next) => {
    const token = req?.cookies?.token;

    authenticationServices.validateToken(token);
    next();
  };
}

const essentialMiddleware = new EssentialMiddleware();

module.exports = essentialMiddleware;
