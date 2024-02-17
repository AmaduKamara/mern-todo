import express from "express";

import * as TodosController from "../controllers/todos";

const router = express.Router();

// Get all Todos
router.get("/", TodosController.getTodos);

// Get a Todo
router.get("/:todoId", TodosController.getTodo);

// Create a new Todo
router.post("/", TodosController.createTodo);

// Update a Todo
router.patch("/:todoId", TodosController.updateTodo);

// Delete a Todo
router.delete("/:todoId", TodosController.deleteTodo);

export default router;
