const { dbClient } = require("../database/dbClient");

class UserServices {
  getAll = async () => {
    let usersResp = [];
    try {
      const database = dbClient.db("art_craft");
      const collection = database.collection("user");

      const cursor = collection.find();
      usersResp = await cursor.toArray();
    } finally {
      return usersResp;
    }
  };

  getOne = async (id) => {
    // console.log("User Finding using id ", id);
    let respUser = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("art_craft");
      const collection = database.collection("user");

      const options = {
        projection: { _id: id },
      };

      const respUser = await collection.findOne({}, options);
    } catch (error) {
      // console.log("User By ID Error, ", error);
    } finally {
      return respUser;
    }
  };

  addOne = async (user) => {
    let userResult = null;

    try {
      const collection = dbClient.db("art_craft").collection("user");

      user.create = new Date();
      userResult = await collection.insertOne(user);
    } catch (error) {
      // console.log("User AddOne Error, ", error);
    } finally {
      return userResult;
    }
  };

  userUpdate = async (uUser) => {
    try {
      const database = dbClient.db("art_craft");
      const collection = database.collection("user");

      const filter = { _id: new ObjectId(uUser.id) };

      const options = { upsert: true };

      const { name, email, profileURL } = uUser;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      const result = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes
    }
  };

  deleteOne = async () => {};
}

const userServices = new UserServices();

module.exports = userServices;
