const assignmentServices = require("../services/assignment.services");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class AssignmentController {
  getAll = async (req, resp) => {
    try {
      const assignments = await assignmentServices.getAll();
      resp.status(200);

      if (!esIsEmpty(assignments)) {
        resp.send(
          respFormat(
            assignments,
            `${assignments?.length} assignments found`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` assignments not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` assignments not found`, true));
    }
  };

  getOne = async (req, resp) => {
    console.log("assignment Get One ...User, ", req.user);

    const assignment = await assignmentServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(assignment)) {
        resp.send(respFormat(assignment, "assignment found by ID", true));
      } else {
        resp.send(respFormat(assignment, "assignment not found", false));
      }
    } catch (error) {
      console.log("Get assignments, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "assignments not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const assignment = await assignmentServices.addOne(req.body);
      resp.status(200);
      console.log("CN Adding assignment Resp, ", assignment);
      if (!esIsEmpty(assignment)) {
        resp.send(
          respFormat(assignment, "Assignment added  successfully", true)
        );
      } else {
        resp.send(respFormat(assignment, "Assignment Add  failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "Assignments Add failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const assignment = await assignmentServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(assignment)) {
        resp.send(respFormat(assignment, "Assignment Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "assignments Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await assignmentServices.deleteOne({
        id: req?.params.id,
        user: req?.user?.userEmail,
      });
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "Assignment Delete/Remove successfully", true)
        );
      }
    } catch (error) {
      console.log("Assignment Delete Error ", error);
      resp.send(respFormat(null, "assignment  Delete/Remove failed", false));
    }
  };
}

const assignmentController = new AssignmentController();

module.exports = assignmentController;
