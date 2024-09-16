const express = require("express");
const esMiddleware = require("../middleware/middleware");
const contactController = require("../controller/contact.controller");

const contactRouter = express.Router();

contactRouter.get("/", contactController.getAll);

contactRouter.get("/:id", contactController.getOne);
contactRouter.post("/", contactController.add);
contactRouter.put("/", contactController.updateOne);
contactRouter.delete("/", contactController.deleteOne);

module.exports = contactRouter;
