import { Router } from 'express';
import { getTodoList } from '../operations/todo.list';
import { createTodo } from '../operations/todo.create';
import { deleteTodo } from '../operations/todo.delete';
import { editTodo } from '../operations/todo.edit';

export const todoRoutes = Router();

todoRoutes.get('/todo', async function(req, res) {
  console.log('Session id', req.session.id, JSON.stringify(req.session));
  const sessionId = req.session.id;
  const todos = await getTodoList(sessionId);
  res.status(200).send(todos);
});

todoRoutes.post('/todo', function(req, res) {
  console.log('Session id', req.session);
  const sessionId = req.session.id;
  const todo = req.body.todo;
  createTodo(sessionId, todo)
    .then((newTodo) => res.status(200).send(newTodo))
    .catch((error) => res.status(500).send({ message: error.message }));
});

todoRoutes.patch('/todo/:id', function(req, res) {
  console.log('Session id', req.session.id);
  const sessionId = req.session.id;
  const todoId = req.params.id;
  const todo = req.body.todo;
  editTodo(sessionId, todoId, todo)
    .then((todo) => res.status(200).send(todo))
    .catch((error) => res.status(500).send({ message: error.message }));
});

todoRoutes.delete('/todo/:id', function(req, res) {
  console.log('Session id', req.session.id);
  const sessionId = req.session.id;
  const todoId = req.params.id;
  deleteTodo(sessionId, todoId)
    .then(() => res.status(200).send({ message: 'success' }))
    .catch((error) => res.status(500).send({ message: error.message }));
});
