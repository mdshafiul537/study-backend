const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../utils/esHelper");

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

  getAllDifficulty = async (level) => {
    let assignmentsResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("assignment");

      if (!esIsEmpty(level)) {
        const filter = { difficulty: level };
        const cursor = collection.find(filter);
        assignmentsResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        assignmentsResp = await cursor.toArray();
      }
    } finally {
      return assignmentsResp;
    }
  };

  getOne = async (id) => {
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
      const { _id, ...assignment } = uAssignment;

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: assignment,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);

    } catch (error) {
      console.log("Assignment Update ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async ({ id, user }) => {
    let resp = null;
    try {
      const database = dbClient.db("study_db");
      const studyDb = database.collection("assignment");

      const query = { $and: [{ _id: new ObjectId(id) }, { userEmail: user }] };

      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("Assignment Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const assignmentServices = new AssignmentServices();

module.exports = assignmentServices;
