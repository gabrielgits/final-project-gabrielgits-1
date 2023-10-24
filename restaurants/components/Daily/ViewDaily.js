import React, { useContext, useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteNote } from "../../core/network";
import GlobalContext from "../../core/context";

const ViewDaily = ({ note, onRefresh }) => {
  const { index, _id, header, date, comment } = note;
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const { globalState } = useContext(GlobalContext);
  const token = globalState.login.token;
  const userId = globalState.login.userId;

  const handleDetail = () => {
    navigation.navigate("notedetails", { note });
  };

  const handleEdit = () => {
    navigation.navigate("editnote", { note, onRefresh });
  };

    const handleDelete = async () => {

        // for mobile device
        // confirm('Confirm Delete', 'Are you sure you want to delete this note?', [
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //   },
        //   {
        //     text: 'OK',
        //     onPress: async () => {
        //        await deleteNote(token, userId, _id);
        //       if (isDeleted) {
        //         onRefresh();
        //         navigation.navigate('notelist');
              // } else {
              //   console.error('Failed to delete note.');
              // }
        //     },
        //   },
        // ]);

        await deleteNote(token, userId, _id);
        onRefresh();
        navigation.navigate('notelist');
      };
    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
            <View style={styles.row}>

                <View style={styles.name}>
                    <Text>{header}</Text>
                    <Text> {date}</Text>
                    {/* <Text>{comment}</Text> */}
                </View>

                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={handleDetail}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Details</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={handleEdit}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableHighlight><TouchableHighlight
                        onPress={handleDelete}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  foodContainer: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ViewDaily;
