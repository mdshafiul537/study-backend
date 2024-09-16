const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");

class ContactServices {
  getAll = async () => {
    let contactResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("contact");

      const cursor = collection.find();

      contactResp = await cursor.toArray();
    } catch (error) {
      console.log("Get All Contact Error ", error);
    } finally {
      return contactsResp;
    }
  };

  getOne = async (id) => {
    // console.log("contact Finding using id ", id);
    let respContact = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("study_db");
      const collection = database.collection("contact");

      const filter = { _id: new ObjectId(id) };
      respContact = await collection.findOne(filter);
    } catch (error) {
      console.log("contact By ID Error, ", error);
    } finally {
      return respContact;
    }
  };

  addOne = async (contact) => {
    let contactResult = null;
    try {
      const collection = dbClient.db("study_db").collection("contact");

      contact.create = new Date();
      contactResult = await collection.insertOne(contact);
    } catch (error) {
      console.log("contact AddOne Error, ", error);
    } finally {
      return contactResult;
    }
  };

  contactUpdate = async (uContact) => {
    let update = null;
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("contact");
      const { _id, ...contact } = uContact;
      const filter = { _id: new ObjectId(_id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: contact,
      };
      // Update the first document that matches the filter
      update = await collection.updateOne(filter, updateDoc, options);
    } catch (error) {
      console.log("contact update failed ", error);
    } finally {
      return update;
    }
  };

  deleteOne = async (id) => {
    let resp = null;
    try {
      const database = dbConnectionClient.db("study_db");
      const studyDb = database.collection("contact");

      const query = { _id: new ObjectId(id) };
      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("contact Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const contactServices = new ContactServices();

module.exports = contactServices;
