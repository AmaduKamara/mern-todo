import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import TodoModel from "./models/todo";
import e from "express";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const todos = await TodoModel.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

// Middleware to catch routes not found
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// Error middleware
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
);

export default app;
