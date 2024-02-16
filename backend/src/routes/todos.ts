import express from "express";

import * as TodosController from "../controllers/todos";

const router = express.Router();

// Get all Todos
router.get("/", TodosController.getTodos);

// Create a new Todo
router.post("/", TodosController.createTodo);

export default router;
