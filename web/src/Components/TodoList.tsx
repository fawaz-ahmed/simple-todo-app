import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from './TodoItem';
import { Todo } from '../Types';

interface TodoListProps {
  todos: Todo[];
  onEditTodo: (_todo: Todo) => void;
  onDeleteTodo: (_id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onEditTodo }) => {
  return (
    <ListGroup>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo} onDelete={onDeleteTodo} onSave={onEditTodo} />
      ))}
    </ListGroup>
  );
};

export default TodoList;