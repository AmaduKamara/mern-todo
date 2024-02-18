import { useEffect, useState } from "react";
import { Todo as TodoModel } from "./models/todo";
import Todo from "./components/Todo";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as TodosApi from "./network/todos_api";

import styles from "./styles/TodoPage.module.css";
import styleUtils from "./styles/Utils.module.css";
import AddTodoDialog from "./components/AddTodoDialog";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [showTodoDialog, setShowTodoDialog] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await TodosApi.fetchTodos();
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
      <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={() => setShowTodoDialog(true)}>
        + Add New Todo
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {todos.map((todo) => (
          <Col key={todo._id}>
            <Todo todo={todo} className={styles.todo} />
          </Col>
        ))}
      </Row>
      {showTodoDialog && (
        <AddTodoDialog
          onDismis={() => setShowTodoDialog(false)}
          onTodoSaved={(newTodo) => {
            setTodos([...todos, newTodo]);
            setShowTodoDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
