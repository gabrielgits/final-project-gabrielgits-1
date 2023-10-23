import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import AddCart from './AddCart';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../core/context';

export default function CartList() {

    const { globalState, setGlobalState } = useContext(GlobalContext); 

    const [searchText, setSearchText] = useState('');
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false); //handle Food list refresh by this state change
    const navigation = useNavigation();

    const onRefresh = () => {
        setRefresh(!refresh)
    }

    const handleReviewCart = () => {
        navigation.navigate('reviewcart')
    }

    return (
        <SafeAreaView
            style={styles.root}>
            <View style={{ flex: 0.2 }}>
                <Pressable style={styles.cartButton} >
                    <Text style={styles.submitButtonText} onPress={handleReviewCart} >Cart(0)</Text>
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
                {searchText.length>0 && <FlatList
                    data={globalState.foods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<AddCart food={{ ...item, index }} onRefresh={onRefresh}/>
                    )}
                />}
                
            </View>
        </SafeAreaView>

    )
}


