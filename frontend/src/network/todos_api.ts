import { Todo } from "../models/todo";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetchData("http://localhost:5000/api/v1/todos", {
    method: "GET",
  });
  return response.json();
}

export interface TodoInput {
  title: string;
  text?: string;
  priority: string;
}

export async function createTodos(todo: TodoInput): Promise<Todo> {
  const response = await fetchData("http://localhost:5000/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
}
