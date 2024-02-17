import { Card, Badge } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";
import styles from '../styles/Todo.module.css'

interface TodoProps {
  todo: TodoModel;
  className?: string;
}

const Todo = ({ todo, className }: TodoProps) => {
  const { title, text, priority, createdAt, updatedAt } = todo;
  return (
    <Card className={`${styles.todoCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Badge bg={`${priority === 'low' ? "warning" : "danger"}`}>{priority}</Badge>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createdAt}
      </Card.Footer>
    </Card>
  );
};

export default Todo;
