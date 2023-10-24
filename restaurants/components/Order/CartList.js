import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import styles from '../../styles/appStyles';
import AddCart from './AddCart';
import GlobalContext from '../../core/context';

export default function CartList() {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [searchText, setSearchText] = useState('');
    const [state, setState] = useState({
        cart: [],
        custumerName: '',
    });
    const navigation = useNavigation();

    const removeCart = () => {
        setState({ ...state, cart: [] });
    }

    const handleReviewCart = () => {
        navigation.navigate('reviewcart', { cart: state.cart, custumerName: searchText, empltyCart: removeCart });
    }

    const foodAddToCart = (food) => {
        const foodIndex = state.cart.findIndex((item) => item._id === food._id);

        if (foodIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[foodIndex] = {
                ...updatedCart[foodIndex],
                qty: updatedCart[foodIndex].qty + 1
            };
            setState({ ...state, cart: updatedCart });
        } else {
            setState({ ...state, cart: [...state.cart, { ...food, qty: 1 }] });
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            if (navigation.isFocused()) {
                removeCart();
            }
        }, [])
    );

    return (
        <SafeAreaView style={styles.root}>
            <View style={{ flex: 0.2 }}>
                <Pressable style={styles.cartButton} >
                    <Text style={styles.submitButtonText} onPress={handleReviewCart} >Cart({state.cart.length})</Text>
                </Pressable>
                <Text style={styles.title}> My Cart</Text>
            </View >
            <View style={{ flex: 0.8 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Customer Name'
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}>
                </TextInput>
                <FlatList
                    data={globalState.foods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<AddCart food={{ ...item, index }} foodAddToCart={foodAddToCart} />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
