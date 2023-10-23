import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { addNoteToDB } from '../../core/network';
import GlobalContext from '../../core/context';
import { useRoute } from '@react-navigation/native';

function AddNotes({ navigation }) {
  const { globalState } = useContext(GlobalContext);
  const token = globalState.login.token;
  const userId = globalState.login.userId;
  const [note, setNote] = useState({ header: '', comment: '', date: '' });


  const route = useRoute();
  const { onRefresh } = route.params;


  const addNote = async () => {
    const isNoteAdded = await addNoteToDB(token, userId, note);
    if (isNoteAdded) {
         onRefresh();
      navigation.goBack();
    } else {
      console.error('Failed to add note.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Header"
        value={note.header}
        onChangeText={(text) => setNote({ ...note, header: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={note.comment}
        onChangeText={(text) => setNote({ ...note, comment: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={note.date}
        onChangeText={(text) => setNote({ ...note, date: text })}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addNote} />
        <Button
          title="Cancel"
          onPress={() => navigation.navigate('notelist')}
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
});

export default AddNotes;
