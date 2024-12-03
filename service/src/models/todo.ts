import { Model } from "mongoose";
import { Todo, TodoSchema } from "../schema/todo";
import { db } from "../store/db";

let TodoModel: Model<Todo>;

export const getTodoModel = () => {
  if (TodoModel) {
    return TodoModel;
  }
  TodoModel = db.model('Todo', TodoSchema);
  return TodoModel;
}