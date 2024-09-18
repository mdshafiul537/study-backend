const express = require("express");
const assignmentController = require("../controller/assignment.controller");
const esMiddleware = require("../middleware/middleware");

const assignmentRouter = express.Router();

assignmentRouter.get("/", assignmentController.getAll);
assignmentRouter.get("/difficulty", assignmentController.getAllByDifficulty);
assignmentRouter.get(
  "/:id",
  esMiddleware.isAuthorize,
  assignmentController.getOne
);
assignmentRouter.post("/", esMiddleware.isAuthorize, assignmentController.add);
assignmentRouter.post(
  "/update",
  esMiddleware.isAuthorize,
  assignmentController.updateOne
);

assignmentRouter.put(
  "/",
  esMiddleware.isAuthorize,
  assignmentController.updateOne
);
assignmentRouter.delete(
  "/:id",
  esMiddleware.isAuthorize,
  assignmentController.deleteOne
);

module.exports = assignmentRouter;
