import { Card, Badge } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";
import styles from "../styles/Todo.module.css";
import { formatDate } from "../utils/formatDate";

interface TodoProps {
  todo: TodoModel;
  className?: string;
}

const Todo = ({ todo, className }: TodoProps) => {
  const { title, text, priority, createdAt, updatedAt } = todo;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.todoCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Badge bg={`${priority === "low" ? "warning" : "danger"}`} className={styles.badgeStyle}>
          {priority}
        </Badge>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Todo;
