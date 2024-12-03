import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';
import { fetchTodos } from './Apis';
import { Todo } from './Types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodo = useCallback((newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, [setTodos]);

  const onEditTodo = useCallback((newTodo: Todo) => {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo._id === newTodo._id);
      if (index === -1) {
        return prevTodos;
      }
      const newTodos = [...prevTodos];
      newTodos[index] = newTodo;
      return newTodos;
    });
  }, [setTodos]);

  const onDeleteTodo = useCallback((_id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
  }, [setTodos]);

  useEffect(() => {
    fetchTodos()
      .then((_todos) => setTodos(_todos))
      .catch((error) => {
        console.error('Error fetching todos', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="todo-app">
        <h1>Simple todo app</h1>
        <AddTodo onAddTodo={onAddTodo} />
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo} onEditTodo={onEditTodo} />
      </div>
    </div>
  );
}

export default App;
