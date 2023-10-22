// // components/AddNotes.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';

// function AddNotes({ navigation }) {
//   const [header, setHeader] = useState('');
//   const [comment, setComment] = useState('');
//   const addNote = () => {  
//   };

//   return (
//     <View>
//       <Text>Add a New Note</Text>
//       <TextInput
//         placeholder="Header"
//         value={header}
//         onChangeText={(text) => setHeader(text)}
//       />
//       <TextInput
//         placeholder="Comment"
//         value={comment}
//         onChangeText={(text) => setComment(text)}
//       />
//       <Button title="Add" onPress={addNote} />
//       <Button title="Cancel" onPress={() => navigation.navigate('notelist')} />
//     </View>
//   );
// }

// export default AddNotes;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function AddNotes({ navigation }) {
  const [header, setHeader] = useState('');
  const [comment, setComment] = useState('');

  const addNote = () => {
    // Implement your logic to add the note
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
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addNote} style={styles.button} />
        <Button
          title="Cancel"
          onPress={() => navigation.navigate('NoteList')}
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

export default AddNotes;
