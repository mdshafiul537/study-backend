const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");

class QuoteServices {
  getAll = async () => {
    let quotesResp = [];
    try {
      const database = dbClient.db("art_craft");
      const collection = database.collection("quote");

      const cursor = collection.find();

      quotesResp = await cursor.toArray();
    } catch (error) {
      console.log("Get All quote Error ", error);
    } finally {
      return quotesResp;
    }
  };

  getOne = async (id) => {
    // console.log("quote Finding using id ", id);
    let respQuote = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("art_craft");
      const collection = database.collection("quote");

      const filter = { _id: new ObjectId(id) };
      respQuote = await collection.findOne(filter);
    } catch (error) {
      console.log("quote By ID Error, ", error);
    } finally {
      return respQuote;
    }
  };

  addOne = async (quote) => {
    let quoteResult = null;

    try {
      const collection = dbClient.db("art_craft").collection("quote");

      quote.create = new Date();
      quoteResult = await collection.insertOne(quote);
    } catch (error) {
      console.log("quote AddOne Error, ", error);
    } finally {
      return quoteResult;
    }
  };

  quoteUpdate = async (uQuote) => {
    let update = null;
    try {
      const database = dbClient.db("art_craft");
      const collection = database.collection("quote");

      const filter = { _id: new ObjectId(uQuote.id) };

      const options = { upsert: true };

      const { name, email, profileURL } = uQuote;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      update = await collection.updateOne(filter, updateDoc, options);
    } catch (error) {
      console.log("Quote update failed ", error);
    } finally {
      return update;
    }
  };

  deleteOne = async (id) => {
    let resp = null;
    try {
      const database = dbConnectionClient.db("study_db");
      const studyDb = database.collection("quote");

      const query = { _id: new ObjectId(id) };
      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("Quote Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const quoteServices = new QuoteServices();

module.exports = quoteServices;
