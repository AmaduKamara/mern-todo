import { useEffect, useState } from "react";
import { Todo as TodoModel } from "./models/todo";
import Todo from "./components/Todo";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as TodosApi from "./network/todos_api";
import { FaPlus } from "react-icons/fa";

import styles from "./styles/TodoPage.module.css";
import styleUtils from "./styles/Utils.module.css";
import AddEditTodoDialog from "./components/AddEditTodoDialog";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [showTodoDialog, setShowTodoDialog] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<TodoModel | null>(null);

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

  async function deleteTodo(todo: TodoModel) {
    try {
      await TodosApi.deleteTodo(todo._id);
      setTodos(todos.filter((existingTodo) => existingTodo._id !== todo._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowTodoDialog(true)}
      >
        <FaPlus /> Add New Todo
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {todos.map((todo) => (
          <Col key={todo._id}>
            <Todo
              todo={todo}
              className={styles.todo}
              onDeleteTodoClick={deleteTodo}
              onTodoClick={setTodoToEdit}
            />
          </Col>
        ))}
      </Row>
      {showTodoDialog && (
        <AddEditTodoDialog
          onDismis={() => setShowTodoDialog(false)}
          onTodoSaved={(newTodo) => {
            setTodos([...todos, newTodo]);
            setShowTodoDialog(false);
          }}
        />
      )}
      {todoToEdit && (
        <AddEditTodoDialog
          todoToEdit={todoToEdit}
          onDismis={() => setTodoToEdit(null)}
          onTodoSaved={(updatedTodo) => {
            setTodos(
              todos.map((existingTodo) =>
                existingTodo._id === updatedTodo._id
                  ? updatedTodo
                  : existingTodo
              )
            );
            setTodoToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
