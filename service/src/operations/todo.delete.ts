import { ObjectId } from "mongodb";
import { getTodoModel } from "../models/todo";

const deleteTodo = async (sessionId: string, todoId: string): Promise<void> => {
  try {
    const TodoModel = getTodoModel();
    const todoObjectId = new ObjectId(todoId);
    const todoExists = await TodoModel.exists({ _id: todoObjectId, sessionId });
    if (!todoExists) {
      throw new Error('Todo not found');
    }
    await TodoModel.deleteOne(todoObjectId);
  } catch (error) {
    console.error('Error deleting todo', error);
    throw error;
  }
}

export { deleteTodo }
