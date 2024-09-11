const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const dbClient = new MongoClient(uri);

const dbActionQuery = async (actionQuery) => {
  try {
    const database = dbClient.db("art_craft");
    actionQuery(database);
  } catch (error) {
    // console.log("DB Action Query Error ", error);
  } finally {
  }
};

module.exports = { dbClient, dbActionQuery };
