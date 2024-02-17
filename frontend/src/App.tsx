import { useEffect, useState } from "react";
import { Todo as TodoModel } from "./models/todo";
import Todo from "./components/Todo";
import { Container, Row, Col } from "react-bootstrap";

import styles from './styles/TodoPage.module.css'


function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {todos.map((todo) => (
          <Col key={todo._id}>
            <Todo  todo={todo} className={styles.todo}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
