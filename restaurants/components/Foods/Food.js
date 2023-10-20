import React, { useState } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import { deleteFood } from '../../core/network';

const Food = ({ data, onRefresh }) => {
    const { index, _id, name, price } = data;

    const navigation = useNavigation();

    const infoPressed = () => {
        navigation.navigate('fooddetails', { data })
    };

    const handleEdit = () => {
        navigation.navigate('editfood', { data, onRefresh })
    }

    const handleDelete = async () => {
        // Alert.alert('Alert Title', 'My Alert Msg', [
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed')
        //   },
        //   {
        //     text: 'OK',
        //     onPress: async () => {
        //       await deleteFood(_id);
        //       onRefresh()
        //     }
        //   },
        // ]);

        await deleteFood(_id);
        onRefresh()

    }

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
            <View style={styles.row}>

                <View>
                    <Text>{name}- {price}</Text>
                </View>

                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={infoPressed}
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

export default Food;
