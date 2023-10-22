import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addNoteToDB } from '../../core/network';
import GlobalContext from '../../core/context';

function AddNotes({ navigation }) {
  const [header, setHeader] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { globalState } = useContext(GlobalContext)
  const token = globalState.login.token

  
  const onRefresh = () => {
    setRefresh(!refresh);
  };
  const addNote = async () => {
    const noteData = {
      header,
      comment,
      date,
    };

    const isNoteAdded = await addNoteToDB(noteData, token);

    if (isNoteAdded) {
           navigation.navigate('notelist');
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
        value={header}
        onChangeText={(text) => setHeader(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addNote} />
        <Button
          title="Cancel"
          onPress={() => navigation.navigate('notelist', {onRefresh})}
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
