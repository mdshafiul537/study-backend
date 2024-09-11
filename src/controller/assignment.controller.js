const respFormat = require("../utils/response/respFormat");

class AssignmentController {
  getAll = async(req, resp) =>{
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
  }

   getOne = async (req, resp)=> {
    const assignment = await assignmentServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(assignment)) {
        resp.send(respFormat(assignment, "assignment not found", true));
      }
    } catch (error) {
      console.log("Get assignments, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "assignments not found", false));
    }
  }

  add = async (assignment) => {
    try {
      const assignment = await assignmentServices.addOne(req.body);
      resp.status(200);

      if (!esIsEmpty(assignment)) {
        resp.send(respFormat(assignment, "assignment Update  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "assignments Update failed", false));
    }
  };
  updateOne = async (req, resp)=> {
    try {
      const assignment = await assignmentServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(assignment)) {
        resp.send(respFormat(assignment, "assignment Update  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "assignments Update failed", false));
    }
  }

   deleteOne = async(req, resp)=> {
    try {
      const deleteResp = await assignmentServices.deleteOne(req?.params?.id);
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "assignment Delete/Remove  failed", true)
        );
      }
    } catch (error) {
      resp.send(respFormat(null, "assignment  Delete/Remove failed", false));
    }
  }
}

const assignmentController = new AssignmentController();

module.exports = assignmentController;
