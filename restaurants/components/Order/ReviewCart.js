import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native'
import styles from '../../styles/appStyles';
import CartItem from './CartItem';
import { addCustomer, findCustomer, addOrder } from '../../core/network'
import GlobalContext from "../../core/context";
import { useNavigation } from '@react-navigation/native';

export default function ReviewCart({ route: { params } }) {

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const [state, setState] = useState({
        cart: params.cart,
        custumerName: params.custumerName,
        totalfee: 0
    });

    const navigation = useNavigation();

    const grandTotal = state.cart.reduce((total, food) => total + food.price * food.qty, 0);

    const handleSubmit = async () => {

        const ret1 = await findCustomer(state.custumerName, globalState.login.token, globalState.login.userId)
        if (ret1 && ret1.success) {
            await addOrder(ret1.orderId, state.cart, globalState.login.token, globalState.login.userId)
        } else {
            const ret = await addCustomer({ customer: state.custumerName }, globalState.login.token, globalState.login.userId)
            if (ret && ret.success) {
                const ret1 = await findCustomer(state.custumerName, globalState.login.token, globalState.login.userId)
                await addOrder(ret1.orderId, state.cart, globalState.login.token, globalState.login.userId)
            }
        }

        params.empltyCart()
        navigation.goBack()
    }

    const foodRemoveFromCart = (food) => {
        const updatedCart = state.cart.filter((item) => item._id !== food._id);
        setState({ ...state, cart: updatedCart });
        if (state.cart.length === 0) {
            params.empltyCart()
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.infoHeader}>
                <View>
                    <Text style={styles.title}>Customer: {params.custumerName}</Text>
                    <Text style={styles.title}>Total Amount: {grandTotal}</Text>
                </View>
                <View>
                    <FlatList
                        data={state.cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (<CartItem food={{ ...item, index }} foodRemoveFromCart={foodRemoveFromCart} />
                        )}
                    />
                </View>
                <View>
                    <Pressable style={styles.submitButton} >
                        <Text style={styles.submitButtonText} onPress={handleSubmit} >Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}