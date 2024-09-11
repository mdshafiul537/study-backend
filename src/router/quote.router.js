const express = require("express");
const quoteController = require("../controller/quote.controller");

const quoteRouter = express.Router();

quoteRouter.get("/", quoteController.getAll);
quoteRouter.get("/:id", quoteController.getOne);
quoteRouter.post("/", quoteController.add);
quoteRouter.put("/", quoteController.updateOne);
quoteRouter.deleteOne("/:id", quoteController.deleteOne);

module.exports = userRouter;
