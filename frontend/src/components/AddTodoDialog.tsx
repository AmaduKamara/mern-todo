import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Todo } from "../models/todo";
import { useForm } from "react-hook-form";
import { TodoInput } from "../network/todos_api";
import * as TodoApi from "../network/todos_api";

interface AddTodoDialogProps {
  onDismis: () => void;
  onTodoSaved: (todo: Todo) => void;
}

const AddTodoDialog = ({ onDismis, onTodoSaved }: AddTodoDialogProps) => {
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>();

  async function onSubmit(input: TodoInput) {
    try {
      const todoResponse = await TodoApi.createTodos(input);
      onTodoSaved(todoResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismis}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addTodoForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Todo Title'
              {...register("title", { required: "required" })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Priority</Form.Label>
            <Form.Select
              aria-label='Default select example'
              {...register("priority", { required: "required" })}
              isInvalid={!!errors.priority}
            >
              <option value='low'>Low</option>
              <option value='high'>High</option>
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {errors.priority?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder='Todo description'
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='addTodoForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoDialog;
