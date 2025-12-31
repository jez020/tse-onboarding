/**
 * Functions that process user route requests.
 */

import { validationResult } from "express-validator";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

// Define a custom type for the request body so we can have static typing
// for the fields
type CreateUserBody = {
  name: string;
  profilePictureURL?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body as CreateUserBody;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const user = await UserModel.create({
      name,
      profilePictureURL,
    });

    // 201 means a new resource has been created successfully
    // the newly created user is sent back to the user
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const { id } = req.params;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const user = await UserModel.findById(id);

    if (!user) {
      // 404 if the user isn't found
      return res.status(404).json({ message: "User not found" });
    }

    // 200 means the request has succeeded and the resource is returned
    res.status(200).json(user);
  } catch (error: unknown) {
    next(error as any);
  }
};
