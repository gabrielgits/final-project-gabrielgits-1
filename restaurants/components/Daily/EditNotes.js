import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import GlobalContext from '../../core/context';
import { editDailyNote } from '../../core/network';

function EditNotes({ route, navigation }) {
  const { note } = route.params;
  const [header, setHeader] = useState(note.header);
  const [comment, setComment] = useState(note.comment);
  const [date, setDate] = useState(note.date);
  
  const { globalState } = useContext(GlobalContext);
  const token = globalState.login.token;

  const saveNote = async () => {
    const updatedNote = { ...note, header, date, comment };
    const isNoteUpdated = await editDailyNote(updatedNote, token);
    if (isNoteUpdated) {
      navigation.navigate('notedetails', { note: updatedNote });
    } else {
      console.error('Failed to update note.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      <TextInput
        style={styles.input}
        value={header}
        onChangeText={(text) => setHeader(text)}
      />

      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveNote} style={styles.button} />
        <Button
          title="Cancel"
          onPress={() => navigation.navigate('notedetails', { note })}
          style={styles.button}
        />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '40%',
  },
});

export default EditNotes;
