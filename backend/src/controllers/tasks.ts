import TaskModel from "src/models/task";

import type { RequestHandler } from "express";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().populate("assignee");
    res
      .status(200)
      .json(
        tasks.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()),
      );
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
