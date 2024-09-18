const express = require("express");
const submissionController = require("../controller/submission.controller");
const esMiddleware = require("../middleware/middleware");

const submissionRouter = express.Router();

submissionRouter.get("/", submissionController.getAll);
submissionRouter.get("/status", submissionController.getAllType);
submissionRouter.get("/user/:user", submissionController.getAllByUser);
submissionRouter.get("/:id", submissionController.getOne);
submissionRouter.post("/", submissionController.add);
submissionRouter.post("/update", submissionController.updateOne);
submissionRouter.put("/", submissionController.updateOne);
submissionRouter.delete("/", submissionController.deleteOne);

module.exports = submissionRouter;
