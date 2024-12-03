import { getTodoModel } from "../models/todo";
import { Todo } from "../schema/todo";
import { ObjectId } from "mongodb";

const editTodo = async (sessionId: string, todoId: string, todo: string): Promise<Todo | null> => {
  try {
    const TodoModel = getTodoModel();
    const todoObjectId = new ObjectId(todoId);
    const todoExists = await TodoModel.exists({ _id: todoObjectId, sessionId });
    if (!todoExists) {
      throw new Error('Todo not found');
    }
    await TodoModel.findByIdAndUpdate(todoObjectId, { todo });
    const updatedTodo = await TodoModel.findById(todoObjectId);
    return updatedTodo;
  } catch (error) {
    console.error('Error creating todo', error);
    throw error;
  }
}

export { editTodo }
