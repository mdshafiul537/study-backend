const authenticationServices = require("../services/authentication.services");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class AuthenticationController {
  createToken = async (req, resp) => {
    resp.status(202);
    try {
      const token = await authenticationServices.createAuthToken(req.body);
      if (!esIsEmpty(token)) {
        resp.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        resp.send(respFormat(null, "Token created successfully", true));
      } else {
        resp.send(respFormat(null, "Token created failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "Token create failed", false));
    }
  };

  validateToken = async (req, resp) => {
    resp.status(202);
    try {
      const token = await authenticationServices.validateToken(req.token);

      resp.send(respFormat(null, "Token validateToken successfully", true));
    } catch (error) {
      resp.send(respFormat(null, "Token create failed", false));
    }
  };

  logOut = async (req, resp) => {
    try {
      resp.clearCookie("token");
      resp.send(respFormat(null, "Sign-out successfully", true));
    } catch (error) {
      resp.send(respFormat(null, "Sign-out failed", false));
    }
  };
}

const authenticationController = new AuthenticationController();

module.exports = authenticationController;
