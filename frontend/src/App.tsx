import { useEffect, useState } from "react";
import { Todo } from "./models/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/todos", {
          method: "GET",
        });
        const todos = await response.json();
        setTodos(todos);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetchTodos();
  }, []);

  console.log(todos);

  return (
    <div>
      <h1>MERN Todo App</h1>
    </div>
  );
}

export default App;
