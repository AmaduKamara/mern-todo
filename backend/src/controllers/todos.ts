import { RequestHandler } from "express";
import TodoModel from "../models/todo";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    // Check if the ID is not a valid mongoose objectId and throw an error
    if (!mongoose.isValidObjectId(todoId)) {
      throw createHttpError(400, "Invalid todo ID");
    }

    const todo = await TodoModel.findById(todoId).exec();

    // Check if the todo is not available and throw an error
    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// Type of Todo body
interface CreateTodoBody {
  title?: string;
  text?: string;
  priority?: string;
}

// Create a Todo
export const createTodo: RequestHandler<
  unknown,
  unknown,
  CreateTodoBody,
  unknown
> = async (req, res, next) => {
  const { title, text, priority } = req.body;

  try {
    // Check if the title is blank and throw an error
    if (!title) {
      throw createHttpError(400, "Todo must have a title");
    }
    // Check if the priority is blank and throw an error
    if (!priority) {
      throw createHttpError(400, "Todo must have a priority");
    }

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
