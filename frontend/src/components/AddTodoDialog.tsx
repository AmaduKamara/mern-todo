import React from "react";
import { Modal } from "react-bootstrap";

interface AddTodoDialogProps {
  onDismis: () => void;
}

const AddTodoDialog = ({ onDismis }: AddTodoDialogProps) => {
  return (
    <Modal show onHide={onDismis}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddTodoDialog;
