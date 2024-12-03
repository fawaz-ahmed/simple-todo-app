import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Todo } from '../Types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEditTodo: (_todo: Todo) => void;
  onDeleteTodo: (_id: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onEditTodo, onRefresh, refreshing }) => {
  const renderItem = ({ item }: { item: Todo }) => (
    <TodoItem {...item} onDelete={onDeleteTodo} onSave={onEditTodo} />
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      keyboardShouldPersistTaps={'handled'}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.container}
    />
  );
};

export default React.memo(TodoList);
