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
    // trim whitespace so strings like "   " are treated as empty
    .trim()
    .isLength({ min: 1 })
    .withMessage("name cannot be empty");

const makeProfilePictureURLValidator = () =>
  body("profilePictureURL")
    // order matters for the validation chain - by marking this field as optional, the rest of
    // the chain will only be evaluated if it exists / is truthy
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("profilePictureURL must be a string")
    .bail()
    .trim()
    // use a custom validator to reliably detect invalid/missing protocol URLs
    .custom((value: string) => {
      try {
        const parsed = new URL(value);
        if (!/^https?:$/.test(parsed.protocol)) {
          throw new Error("profilePictureURL must include http:// or https://");
        }
        return true;
      } catch {
        throw new Error("profilePictureURL must be a valid URL (include http:// or https://)");
      }
    });

export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];
