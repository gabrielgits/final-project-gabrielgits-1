import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import AddCart from './AddCart';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../core/context';

export default function CartList() {

    const { globalState, setGlobalState } = useContext(GlobalContext); 

    const [searchText, setSearchText] = useState('');
    const [state, setState] = useState({
        cart: [],
        custumerName: '',
    });
    const navigation = useNavigation();

    const handleReviewCart = () => {
        navigation.navigate('reviewcart', { cart: state.cart, custumerName: state.custumerName });
    }

    const foodAddToCart = (food) => {
        const foodFind = state.cart.find((item) => item._id === food._id);
        if (foodFind) {
            foodFind.qty = foodFind.qty + 1;
            setState({ ...state, cart: [...state.cart, foodFind] });
            return;
        }
        setState({ ...state, cart: [...state.cart, food] });
    }

    return (
        <SafeAreaView
            style={styles.root}>
            <View style={{ flex: 0.2 }}>
                <Pressable style={styles.cartButton} >
                    <Text style={styles.submitButtonText} onPress={handleReviewCart} >Cart({state.cart.length})</Text>
                </Pressable>
                <Text style={styles.title}> My Cart</Text>
            </View >
            <View style={{ flex: 0.8 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Customer Name'
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}>
                </TextInput>
                 <FlatList
                    data={globalState.foods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<AddCart food={{...item, index}} foodAddToCart={foodAddToCart}/>
                    )}
                />
                
            </View>
        </SafeAreaView>

    )
}


