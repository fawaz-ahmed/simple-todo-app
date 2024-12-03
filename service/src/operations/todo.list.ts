import { getTodoModel } from "../models/todo";
import { Todo } from "../schema/todo";

const getTodoList = async (sessionId: string): Promise<Todo[]> => {
  try {
    const TodoModel = getTodoModel();
    const todos = await TodoModel.find({ sessionId });
    return todos;
  } catch (error) {
    console.error('Error finding todos', error);
    return [];
  }
}

export { getTodoList }
