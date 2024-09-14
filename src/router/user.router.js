const express = require("express");
const userController = require("../controller/user.controller");
const esMiddleware = require("../middleware/middleware");

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", esMiddleware.isAuthorize, userController.getOne);
userRouter.post("/", userController.add);
userRouter.put("/", esMiddleware.isAuthorize, userController.updateOne);
userRouter.delete("/", esMiddleware.isAuthorize, userController.deleteOne);

module.exports = userRouter;
