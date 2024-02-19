import { Todo } from "../models/todo";

const apiUrl = "http://localhost:5000/api/v1/todos";

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
  const response = await fetchData(apiUrl, {
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
  const response = await fetchData(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
}

export const updateTodo = async (
  todoId: string,
  todo: TodoInput
): Promise<Todo> => {
  const response = await fetchData(apiUrl + todoId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export async function deleteTodo(todoId: string) {
  await fetchData(apiUrl + "/" + todoId, {
    method: "DELETE",
  });
}
