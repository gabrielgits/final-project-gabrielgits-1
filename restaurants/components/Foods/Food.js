import React, { useState, useContext } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import { deleteFood } from '../../core/network';
import GlobalContext from '../../core/context';

const Food = ({ food, onRefresh }) => {
    const { index, _id, name, price } = food;

    const {globalState, setGlobalState}=useContext(GlobalContext);

    const navigation = useNavigation();

    const handleDetail = () => {
        navigation.navigate('fooddetails', { food })
    };

    const handleEdit = () => {
        navigation.navigate('editfood', { food, onRefresh })
    }

    const handleDelete = async () => {
        // for mobile device
        // Alert.alert('Alert Title', 'My Alert Msg', [
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed')
        //   },
        //   {
        //     text: 'OK',
        //     onPress: async () => {
        //       await deleteFood(_id, globalState.login.token, globalState.login.userId);
        //       onRefresh()
        //     }
        //   },
        // ]);

        console.log(_id)

        await deleteFood(_id, globalState.login.token, globalState.login.userId);
        onRefresh();
        navigation.navigate('foodlist');

    }

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
            <View style={styles.row}>

                <View style={styles.name}>
                    <Text>Name: {name}</Text>
                    <Text>Price: {price}</Text>
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

export default Food;
