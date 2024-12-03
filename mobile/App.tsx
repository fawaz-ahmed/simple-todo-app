/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AddTodo from './src/Components/AddTodo';
import { Todo } from './src/Types/todo';
import { fetchTodos } from './src/Apis';
import TodoList from './src/Components/TodoList';

function App(): React.JSX.Element {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [refreshCounter, setRefreshCounter] = React.useState(0);
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const onRefresh = useCallback(() => {
    setRefreshCounter((prevCounter) => prevCounter + 1);
   } , [setRefreshCounter]);

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
    setLoading(true);
    fetchTodos()
      .then((_todos) => setTodos(_todos))
      .finally(() => setLoading(false));
  }, [refreshCounter]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AddTodo onAddTodo={onAddTodo} />
      <TodoList refreshing={loading} todos={todos} onRefresh={onRefresh} onEditTodo={onEditTodo} onDeleteTodo={onDeleteTodo} />
    </SafeAreaView>
  );
}

export default App;
