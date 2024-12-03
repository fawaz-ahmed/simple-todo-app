import { getTodoModel } from "../models/todo";
import { Todo } from "../schema/todo";

const createTodo = async (sessionId: string, todo: string): Promise<Todo> => {
  try {
    const TodoModel = getTodoModel();
    const newlyCreatedTodo = await TodoModel.create({ sessionId, todo });
    return newlyCreatedTodo;
  } catch (error) {
    console.error('Error creating todo', error);
    throw error;
  }
}

export { createTodo }
