import { Card, Badge } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";
import styles from "../styles/Todo.module.css";
import styleUtils from "../styles/Utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface TodoProps {
  todo: TodoModel;
  onTodoClick: (todo: TodoModel) => void;
  className?: string;
  onDeleteTodoClick: (todo: TodoModel) => void;
}

const Todo = ({
  todo,
  className,
  onDeleteTodoClick,
  onTodoClick,
}: TodoProps) => {
  const { title, text, priority, createdAt, updatedAt } = todo;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => onTodoClick(todo)}
      className={`${styles.todoCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}{" "}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(e) => {
              onDeleteTodoClick(todo);
              e.stopPropagation();
            }}
          />
        </Card.Title>

        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={`text-muted ${styles.cardFooter}`}>
        {createdUpdatedText}{" "}
        <Badge
          bg={`${priority === "low" ? "warning" : "danger"}`}
          className={styles.badgeStyle}
        >
          {priority}
        </Badge>
      </Card.Footer>
    </Card>
  );
};

export default Todo;
