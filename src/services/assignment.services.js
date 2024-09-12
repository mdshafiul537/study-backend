const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");

class AssignmentServices {
  getAll = async () => {
    let assignmentsResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("assignment");

      const cursor = collection.find();
      assignmentsResp = await cursor.toArray();
    } finally {
      return assignmentsResp;
    }
  };

  getOne = async (id) => {
    console.log("assignment Finding using id ", id);
    let respAssignment = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("study_db");
      const collection = database.collection("assignment");

      const filter = { _id: new ObjectId(id) };

      respAssignment = await collection.findOne(filter);
    } catch (error) {
      console.log("assignment By ID Error, ", error);
    } finally {
      return respAssignment;
    }
  };

  addOne = async (assignment) => {
    let assignmentResult = null;

    try {
      const collection = dbClient.db("study_db").collection("assignment");

      assignment.create = new Date();
      assignmentResult = await collection.insertOne(assignment);
    } catch (error) {
      console.log("assignment AddOne Error, ", error);
    } finally {
      return assignmentResult;
    }
  };

  updateOne = async (uAssignment) => {
    let updateAc = null;
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("assignment");

      const filter = { _id: new ObjectId(uAssignment.id) };

      const updateDoc = {
        $set: uAssignment,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async (id, user) => {
    let resp = null;
    try {
      const database = dbConnectionClient.db("study_db");
      const studyDb = database.collection("assignment");

      const query = { $and: { _id: new ObjectId(id), userEmail: user } };
      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("Quote Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const assignmentServices = new AssignmentServices();

module.exports = assignmentServices;
