const userServices = require( "../services/user.services" );
const respFormat = require( "../utils/response/respFormat" );

class UserController {
  async getAll(req, resp) {
    const users = await userServices
    try {
      console.log("Get users,  ");
    } catch (error) {
      console.log("Get users, Error ", error);
    } finally {
      resp.send(respFormat(null, "Users not found", false));
    }
  }

  async getOne(req, resp) {
    try {
      console.log("Get users,  ");
    } catch (error) {
      console.log("Get users, Error ", error);
    } finally {
      resp.send(respFormat(null, "Users not found", false));
    }
  }

  async updateOne(req, resp) {
    
    try {
      console.log("Get users,  ");
    } catch (error) {
      
      
    } finally {
      resp.send(respFormat(null, "Users not found", false));
    }
  }

  async deleteOne(req, resp) {
    try {
      console.log("Get users,  ");
    } catch (error) {
      console.log("Get users, Error ", error);
    } finally {
      resp.send(respFormat(null, "Users not found", false));
    }
  }
}

const userController = new UserController();

module.exports = userController;
