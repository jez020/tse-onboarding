import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("name is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");
const makeProfilePictureURLValidator = () =>
  body("description")
    // order matters for the validation chain - by marking this field as optional, the rest of
    // the chain will only be evaluated if it exists
    .optional()
    .isString()
    .withMessage("description must be a string")
    .bail()
    .isURL()
    .withMessage("profilePictureURL must be a valid URL");

export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];
