import React, { useState } from 'react';
import { Todo } from '../Types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createTodo } from '../Apis';

interface AddTodoProps {
  onAddTodo: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (todoText.trim()) {
      setLoading(true);
      createTodo(todoText.trim())
        .then((newTodo: Todo | null) => {
          if (newTodo) {
            onAddTodo(newTodo);
          } else {
            alert('Error creating todo');
          }
        })
        .catch((error) => {
          alert('Error creating todo : ' + error.message);
        })
        .finally(() => {
          setLoading(false);
          setTodoText('');
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
      <Form.Control
        type="text"
        placeholder="Add a new todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        contentEditable={!loading}
      />
      <Button disabled={loading} type="submit">Add</Button>
    </Form>
  );
};

export default React.memo(AddTodo);