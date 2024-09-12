const submissionServices = require("../services/submission.services");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class SubmissionController {
  getAll = async (req, resp) => {
    try {
      const submissions = await submissionServices.getAll();
      resp.status(200);

      if (!esIsEmpty(submissions)) {
        resp.send(
          respFormat(
            submissions,
            `${submissions?.length} Submissions found`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` Submissions not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` Submissions not found`, true));
    }
  };

  getOne = async (req, resp) => {
    const submission = await submissionServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(submission)) {
        resp.send(respFormat(submission, "submission not found", true));
      }
    } catch (error) {
      console.log("Get submissions, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "submissions not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const submission = await submissionServices.addOne(req.body);
      resp.status(200);

      if (!esIsEmpty(submission)) {
        resp.send(
          respFormat(submission, "Submission Added  successfully", true)
        );
      }
    } catch (error) {
      resp.send(respFormat(null, "submissions Update failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const submission = await submissionServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(submission)) {
        resp.send(
          respFormat(submission, "Submission Updated successfully", true)
        );
      }
    } catch (error) {
      resp.send(respFormat(null, "submissions Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await submissionServices.deleteOne(req?.params?.id);
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "Submission Delete/Remove  successfully", true)
        );
      } else {
        resp.send(respFormat(null, "Submission  Delete/Remove failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "Submission  Delete/Remove failed", false));
    }
  };
}

const submissionController = new SubmissionController();

module.exports = submissionController;
