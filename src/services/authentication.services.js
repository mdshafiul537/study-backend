const jwt = require("jsonwebtoken");
const { esIsEmpty } = require("../utils/esHelper");

class AuthenticationServices {
  createAuthToken = async (user) => {
    try {
      return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });
    } catch (error) {
      return null;
    }
  };

  validateToken = async (token) => {
    try {
      let isValid = false;
    } catch (error) {
      console.log("Validation Error, ", error);
      isValid = false;
    }
    return isValid;
  };
}

const authenticationServices = new AuthenticationServices();

module.exports = authenticationServices;
