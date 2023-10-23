import { getFoodList } from '../../core/network';
import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import Food from '../Order/Food';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../core/context';

export default function AddCart() {

    const { globalState, setGlobalState } = useContext(GlobalContext); // get token

    const [searchText, setSearchText] = useState('');
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false); //handle Food list refresh by this state change
    const navigation = useNavigation();

    const onRefresh = () => {
        setRefresh(!refresh)
    }

    const handleAddFood = () => {
        navigation.navigate('addfood', { onRefresh })
    }

    return (
        <SafeAreaView
            style={styles.root}>
            <View style={{ flex: 0.2 }}>
                <Pressable style={styles.cartButton} >
                    <Text style={styles.submitButtonText} onPress={handleAddFood} >Cart(0)</Text>
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
                    renderItem={({ item, index }) => (<Food food={{ ...item, index }} onRefresh={onRefresh} />
                    )}
                />}
                
            </View>
        </SafeAreaView>

    )
}


