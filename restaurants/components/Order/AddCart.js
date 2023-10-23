import React, { useState, useContext } from 'react';
import { Alert, View, Text,TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/appStyles';
import GlobalContext from '../../core/context';

const AddCart = ({ food, onRefresh }) => {
    const { index, _id, name, price } = food;
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const navigation = useNavigation();
    const [qtyText, setQtyText] = useState('');
    //console.log(food)

    const handleAddCart = () => {

        food.qty=qtyText;   
        //console.log(food) 
        const newCart = [...globalState.cart, food];      
        setGlobalState({...globalState, cart: newCart})
        const filtredFoods=[...globalState.foods];
        console.log(filtredFoods)

        const flist=filtredFoods.filter((i)=>i._id!==food._id)
        //console.log(flist)

        setGlobalState({...globalState, foods: flist})

        onRefresh();
        console.log(globalState.cart)
    }

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>
            <View style={styles.row}>
                <View style={styles.name}>
                    <Text>Name: {name}</Text>
                    <Text>Price: {price}</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.inputshort}
                        placeholder='Qty'
                        keyboardType="numeric"
                        onChangeText={(text) => setQtyText(text)}
                        value={qtyText}>
                    </TextInput>
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
