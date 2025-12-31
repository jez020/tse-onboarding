/**
 * Defines the "shape" of a Task object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export type User = {
  _id: string;
  name: string;
  profilePictureURL?: string;
};
