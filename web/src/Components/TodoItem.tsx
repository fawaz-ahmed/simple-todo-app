import React, { useState } from 'react';
import { Button, InputGroup, FormControl, FormLabel, ListGroup } from 'react-bootstrap';
import { Todo } from '../Types';
import { deleteTodo, editTodo } from '../Apis';

interface TodoItemProps extends Todo {
  onDelete: (_id: string) => void;
  onSave: (_todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps>  = ({ _id, todo, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(todo);

  const handleSave = () => {
    editTodo(_id, currentText)
      .then((updatedTodo: Todo | null) => {
        if (updatedTodo) {
          onSave(updatedTodo);
        }
      }
      )
      .catch((error) => {
        console.error('Error editing todo', error);
      })
      .finally(() => setIsEditing(false));
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(_id)
      .then(() => onDelete(_id))
      .catch((error) => {
        console.error('Error deleting todo', error);
      });
  }

  const handleCancel = () => {
    setCurrentText(todo);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <InputGroup>
          <FormControl
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        </InputGroup>
      ) : (
        <FormControl
          type="text"
          value={todo}
          readOnly
        />
      )}
      {isEditing ? (
        <>
          <Button variant="success" onClick={handleSave} className="me-2">Save</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <>
          <Button variant="primary" onClick={() => setIsEditing(true)} className="me-2">Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </>
      )}
    </div>
  );
};

export default React.memo(TodoItem);
