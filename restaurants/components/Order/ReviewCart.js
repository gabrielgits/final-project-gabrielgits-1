import React, { useContext,useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native'
import styles from '../../styles/appStyles';
import CartItem from './CartItem';

export default function ReviewCart({route: {params}}) {

    const [state, setState] = useState({
        cart: params.cart,
        custumerName: params.custumerName,
    });

    console.log(state.custumerName)

    const handleSubmit=()=>{

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