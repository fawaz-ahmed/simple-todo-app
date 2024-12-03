import { Schema, model, Types } from 'mongoose';

interface Todo {
  _id: string;
  sessionId: string,
  todo: string;
}

const schema = new Schema<Todo>({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  todo: String,
});

const TodoSchema = schema;

export { Todo, TodoSchema }