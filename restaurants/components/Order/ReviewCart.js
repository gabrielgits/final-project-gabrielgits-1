import React, { useContext } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native'
import styles from '../../styles/appStyles';
import CartItem from './CartItem';
import GlobalContext from '../../core/context';

export default function ReviewCart() {

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const handleSubmit=()=>{

    }

    console.log(globalState.cart)

    return (
        <View style={styles.container}>
            <View style={styles.infoHeader}>                
                <View>
                    <FlatList
                        data={globalState.cart}
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