// import axios from 'axios'
import { create } from 'apisauce'
import { Todo } from '../Types';

const baseURL = 'http://localhost:3000';

// const customAxiosInstance = axios.create({ baseURL })

// const api = create({
//   axiosInstance: customAxiosInstance,
//   baseURL,
//   withCredentials: true,
// })

const api = create({ baseURL, withCredentials: true })

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await api.get('/todo');
    if (!response.ok) {
      console.log('Error fetching todos', response.problem);
      return [];
    }
    const todos: Todo[] = response.data as Todo[];
    console.log('Fetched todos', todos);
    return todos;
};

export const createTodo = async (todoText: string): Promise<Todo | null> => {
  const response = await api.post('/todo', { todo: todoText });
  if (!response.ok) {
    console.log('Error creating todo', response.problem);
    return null;
  }
  const todo: Todo = response.data as Todo;
  console.log('Created todo', todo);
  return todo;
};

export const editTodo = async (todoId: string, todoText: string): Promise<Todo | null> => {
  const response = await api.patch(`/todo/${todoId}`, { todo: todoText });
  if (!response.ok) {
    console.log('Error updating todo', response.problem);
    return null;
  }
  const todo: Todo = response.data as Todo;
  console.log('Updated todo', todo);
  return todo;
};

export const deleteTodo = async (todoId: string): Promise<boolean> => {
  const response = await api.delete(`/todo/${todoId}`);
  if (!response.ok) {
    console.log('Error deleting todo', response.problem);
    return false;
  }
  return true;
};
