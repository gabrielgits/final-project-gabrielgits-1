import React, { useState, useContext } from 'react';
import { Alert, View, Text,TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import GlobalContext from '../../core/context';

const AddCart = ({ food, foodAddToCart }) => {


    const handleAddCart = () => {
        food.qty=1;   
        foodAddToCart(food);
    }

    return (
        <View
            style={{ backgroundColor: food.index % 2 === 0 ? 'white' : '#F3F3F7' }}>
            <View style={styles.row}>
                <View style={styles.name}>
                    <Text>Name: {food.name}</Text>
                    <Text>Price: {food.price}</Text>
                </View>
                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={handleAddCart}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default AddCart;
