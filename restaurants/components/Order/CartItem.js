import React, { useState, useContext } from 'react';
import { Alert, View, Text,TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import GlobalContext from '../../core/context';

const CartItem = ({ food }) => {
    const { index, _id, name, price } = food;
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const navigation = useNavigation();
    const handleRemove = () => {    
        
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
                        onPress={handleRemove}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default CartItem;
