import React, { useState } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import { deleteNote } from '../../core/network';


const ViewDaily = ({ note, onRefresh }) => {
    const { index, _id, header, date, comment } = note;

    const navigation = useNavigation();

    const handleDetail = () => {
        navigation.navigate('notedetails', { note })
    };

    const handleEdit = () => {
        navigation.navigate('editnote', { note, onRefresh })
    }

    const handleDelete = async () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this note?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'OK',
            onPress: async () => {
              const isDeleted = await deleteNote(_id, token);
              if (isDeleted) {
                onRefresh();
              } else {
                console.error('Failed to delete note.');
              }
            },
          },
        ]);
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

export default ViewDaily;
