import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import todosRoutes from "./routes/todos";

const app = express();

app.use(morgan("dev"));

// Express middleware
app.use(express.json());

// API Routes
app.use("/api/v1/todos", todosRoutes);

// Middleware to catch routes not found
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error middleware
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Unknown error occured";
    let statusCode = 500; // 500 Internal Server Error
    if (isHttpError(error)) {
      statusCode = error.status; // Set status code to the error status code
      errorMessage = error.message; // Set error message to the error message
    }
    res.status(statusCode).json({ error: errorMessage });
  }
);

export default app;
