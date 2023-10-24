import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function NoteDetails({ route, navigation }) {
  const { note } = route.params;
  const deleteNote = () => {
    navigation.navigate('notelist');
  };

  const noteDate = new Date(note.date);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header: {note.header}</Text>
      <Text style={styles.date}>Date: {noteDate.toDateString()}</Text>
      <Text style={styles.comment}>Comment: {note.comment}</Text>
      <Button title="Go Back"
        onPress={() => navigation.navigate('notelist')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    marginTop: 10,
  },
});

export default NoteDetails;
