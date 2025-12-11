/**
 * Task route requests.
 */

import express from "express";
import * as UserController from "src/controllers/user";
import * as UserValidator from "src/validators/user";

const router = express.Router();

/**
 * TaskValidator.createTask serves as middleware for this route. This means
 * that instead of immediately serving up the route when the request is made,
 * Express firsts passes the request to TaskValidator.createTask.
 * TaskValidator.createTask processes the request and determines whether the
 * request should be sent through or an error should be thrown.
 */
router.get("/:id", UserController.getUser);
router.post("/", UserValidator.createUser, UserController.createUser);

export default router;
