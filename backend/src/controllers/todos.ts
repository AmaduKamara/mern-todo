import { RequestHandler } from "express";
import TodoModel from "../models/todo";

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const todos = await TodoModel.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo: RequestHandler = async (req, res, next) => {
  const { title, text, priority } = req.body;

  try {
    const newTodo = await TodoModel.create({
      title,
      text,
      priority,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};
