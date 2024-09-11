const { dbClient } = require("../database/dbClient");

class SubmissionServices {
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

      const options = {
        projection: { _id: id },
      };

      const respSubmission = await collection.findOne({}, options);
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

      const filter = { _id: new ObjectId(uSubmission.id) };

      const updateDoc = {
        $set: uSubmission,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async () => {};
}

const submissionServices = new SubmissionServices();

module.exports = submissionServices;
