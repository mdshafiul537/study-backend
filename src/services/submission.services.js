const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../utils/esHelper");

class SubmissionServices {
  getAllByUser = async (user) => {
    let submissionResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("submission");
      const filter = { $or: [{ userEmail: user }, { userName: user }] };

      const cursor = collection.find(filter);
      submissionResp = await cursor.toArray();
    } finally {
      return submissionResp;
    }
  };

  getAllByStatus = async (type) => {
    let submissionResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("submission");
      const filter = { status: type };
      if (!esIsEmpty(type)) {
        const cursor = collection.find(filter);
        submissionResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        submissionResp = await cursor.toArray();
      }
    } finally {
      return submissionResp;
    }
  };
  getAll = async () => {
    let submissionResp = [];
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("submission");

      const cursor = collection.find();
      submissionResp = await cursor.toArray();
    } finally {
      return submissionResp;
    }
  };

  getOne = async (id) => {
    // console.log("submission Finding using id ", id);
    let respSubmission = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("study_db");
      const collection = database.collection("submission");

      const filter = { _id: new ObjectId(id) };

      respSubmission = await collection.findOne(filter);
    } catch (error) {
      // console.log("submission By ID Error, ", error);
    } finally {
      return respSubmission;
    }
  };

  addOne = async (submission) => {
    let submissionResult = null;

    try {
      const collection = dbClient.db("study_db").collection("submission");

      submission.create = new Date();
      submissionResult = await collection.insertOne(submission);
    } catch (error) {
      // console.log("submission AddOne Error, ", error);
    } finally {
      return submissionResult;
    }
  };

  updateOne = async (uSubmission) => {
    let updateAc = null;
    try {
      const database = dbClient.db("study_db");
      const collection = database.collection("submission");
      const { _id, ...submission } = uSubmission;

      submission.status = "Complete";

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: submission,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);
    } catch (error) {
      console.log("Update Submission Error, ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async (id) => {
    let resp = null;
    try {
      const database = dbConnectionClient.db("study_db");
      const studyDb = database.collection("submission");

      const query = { _id: new ObjectId(id) };
      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("Quote Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const submissionServices = new SubmissionServices();

module.exports = submissionServices;
