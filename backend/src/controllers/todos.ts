import { RequestHandler } from "express";
import TodoModel from "../models/todo";

// Get all Todos
export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const todos = await TodoModel.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// Get a Todo
export const getTodo: RequestHandler = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    const todo = await TodoModel.findById(todoId).exec();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// Create a Todo
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
