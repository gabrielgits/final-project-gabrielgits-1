// // components/EditNotes.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';

// function EditNotes({ route, navigation }) {
//   const { note } = route.params;
//   const [header, setHeader] = useState(note.header);
//   const [comment, setComment] = useState(note.comment);

//   const saveNote = () => {
//     const updatedNote = { ...note, header, comment };
  
//     navigation.navigate('notedetails', { note: updatedNote });
//   };

//   return (
//     <View>
//       <Text>Edit Note</Text>
//       <TextInput value={header} onChangeText={(text) => setHeader(text)} />
//       <TextInput value={comment} onChangeText={(text) => setComment(text)} />
//       <Button title="Save" onPress={saveNote} />
//       <Button
//         title="Cancel"
//         onPress={() => navigation.navigate('NoteDetails', { note })}
//       />
//     </View>
//   );
// }

// export default EditNotes;



import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function EditNotes({ route, navigation }) {
  const { note } = route.params;
  const [header, setHeader] = useState(note.header);
  const [comment, setComment] = useState(note.comment);

  const saveNote = () => {
    const updatedNote = { ...note, header, comment };
    navigation.navigate('notedetails', { note: updatedNote });
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
