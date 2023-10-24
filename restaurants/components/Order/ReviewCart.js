import React, { useContext,useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native'
import styles from '../../styles/appStyles';
import CartItem from './CartItem';
import {addCustomer, findCustomer, addOrder} from '../../core/network'
import GlobalContext from "../../core/context";
import { useNavigation } from '@react-navigation/native';

export default function ReviewCart({route: {params}}) {

    const {globalState, setGlobalState}=useContext(GlobalContext);

    const [state, setState] = useState({
        cart: params.cart,
        custumerName: params.custumerName,
    });

    //console.log(state.custumerName)
    const navigation = useNavigation();

    const handleSubmit= async()=>{

        const ret=await addCustomer({customer: state.custumerName},globalState.login.token, globalState.login.userId)
        if(ret && ret.success){
            const ret1=await findCustomer(state.custumerName, globalState.login.token, globalState.login.userId)
            if (ret1 && ret1.success){
                console.log(ret1)
                const ret2=await addOrder(ret1.orderId, state.cart, globalState.login.token, globalState.login.userId)
                console.log(ret2)
            }
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoHeader}>
                <View>
                    <Text style={styles.title}>Customer: {params.custumerName}</Text>
                </View>                
                <View>
                    <FlatList
                        data={state.cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (<CartItem food={{ ...item, index }} />
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