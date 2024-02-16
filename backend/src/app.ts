import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import todosRoutes from "./routes/todos";

const app = express();

app.use(morgan("dev"));

// Express middleware
app.use(express.json());

// API Routes
app.use("/api/v1/todos", todosRoutes);

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
