// // // components/NoteDetails.js
// // import React from 'react';
// // import { View, Text, Button } from 'react-native';


// // function NoteDetails({ route, navigation }) {
// //   const { note } = route.params;
// //   const deleteNote = () => {
// //     navigation.navigate('notelist');
// //   };

// //   return (
// //     <View>
// //       <Text>Header: {note.header}</Text>
// //       <Text>Date: {note.date.toDateString()}</Text>
// //       <Text>Comment: {note.comment}</Text>
// //       <Button title="Delete" onPress={deleteNote} />
// //       <Button title="Go Back" onPress={() => navigation.navigate('notelist')} />
// //     </View>
// //   );
// // }

// // export default NoteDetails;


// import React from 'react';
// import { View, Text, Button } from 'react-native';

// function NoteDetails({ route, navigation }) {
//   const { note } = route.params;
//   const deleteNote = () => {
//     navigation.navigate('NoteList');
//   };

//   // Ensure that note.date is a Date object or parse it into a Date object
//   const noteDate = new Date(note.date);

//   return (
//     <View>
//       <Text>Header: {note.header}</Text>
//       <Text>Date: {noteDate.toDateString()}</Text> {/* Use noteDate instead of note.date */}
//       <Text>Comment: {note.comment}</Text>
//       <Button title="Delete" onPress={deleteNote} />
//       <Button title="Go Back" onPress={() => navigation.navigate('NoteList')} />
//     </View>
//   );
// }

// export default NoteDetails;



import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function NoteDetails({ route, navigation }) {
  const { note } = route.params;
  const deleteNote = () => {
    navigation.navigate('NoteList');
  };

  // Ensure that note.date is a Date object or parse it into a Date object
  const noteDate = new Date(note.date);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header: {note.header}</Text>
      <Text style={styles.date}>Date: {noteDate.toDateString()}</Text>
      <Text style={styles.comment}>Comment: {note.comment}</Text>
      {/* <Button title="Delete" onPress={deleteNote} style={styles.button} /> */}
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
