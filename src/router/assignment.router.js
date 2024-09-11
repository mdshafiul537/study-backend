const express = require("express");
const assignmentController = require("../controller/assignment.controller");

const assignmentRouter = express.Router();

assignmentRouter.get("/", assignmentController.getAll);
assignmentRouter.get("/:id", assignmentController.getOne);
assignmentRouter.post("/", assignmentController.add);
assignmentRouter.put("/", assignmentController.updateOne);
assignmentRouter.delete("/", assignmentController.deleteOne);

module.exports = assignmentRouter;
