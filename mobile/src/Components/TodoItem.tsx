import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Todo } from '../Types/todo';
import { deleteTodo, editTodo } from '../Apis';

interface TodoItemProps extends Todo {
  onDelete: (_id: string) => void;
  onSave: (_todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ _id, todo, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(todo);

  const handleSave = () => {
    editTodo(_id, currentText)
      .then((updatedTodo: Todo | null) => {
        if (updatedTodo) {
          onSave(updatedTodo);
        }
      }
      )
      .catch((error) => {
        console.error('Error editing todo', error);
      })
      .finally(() => setIsEditing(false));
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(_id)
      .then(() => onDelete(_id))
      .catch((error) => {
        console.error('Error deleting todo', error);
      });
  }

  const handleCancel = () => {
    setCurrentText(todo);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={currentText}
          onChangeText={setCurrentText}
          multiline
        />
      ) : (
        <Text style={styles.text}>{todo}</Text>
      )}
      <View style={styles.buttons}>
        {isEditing ? (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} />
          </>
        ) : (
          <>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <Button title="Delete" onPress={() => handleDelete()} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default React.memo(TodoItem);