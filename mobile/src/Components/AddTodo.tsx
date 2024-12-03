import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createTodo } from '../Apis';
import { Todo } from '../Types/todo';

const AddTodo: React.FC<{ onAddTodo: (todo: Todo) => void, defaultTodoText?: string }> = ({ onAddTodo, defaultTodoText }) => {
  const [todoText, setTodoText] = useState(defaultTodoText || '');
  const [loading, setLoading] = useState(false);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      setLoading(true);
      createTodo(todoText)
        .then((newTodo: Todo | null) => {
          if (newTodo) {
            onAddTodo(newTodo);
          } else {
            Alert.alert('Error creating todo');
          }
        })
        .catch((error) => {
          Alert.alert('Error creating todo', error.message);
        })
        .finally(() => {
          setLoading(false);
          setTodoText('');
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new todo"
        value={todoText}
        onChangeText={setTodoText}
        editable={!loading}
        onSubmitEditing={handleAddTodo}
      />
      <Button disabled={loading || !todoText} title="Add" onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default React.memo(AddTodo);
