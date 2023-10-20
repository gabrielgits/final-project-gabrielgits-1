import { getFoodList } from '../../core/network';
import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import Food from './Food';
import { useNavigation } from '@react-navigation/native';

export default function FoodList() {
    const [searchText, setSearchText] = useState('');
    const [foods, setFood] = useState([]);
    const [refresh, setRefresh] = useState(false); //handle Food list refresh by this state change
    const navigation = useNavigation();

    const onRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        try {
            async function getData() {
                const ret = await getFoodList();
                if (ret && ret.success) {
                    setFood(ret.data);
                }
            }
            getData()

        } catch (error) {

        }
    }, [refresh])

    const handleAddFood = () => {
        navigation.navigate('addfood', { onRefresh })
    }

    return (
        <SafeAreaView
            style={styles.root}>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.info}> Foods InStock</Text>
            </View >
            <View style={{ flex: 0.7 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Live Search'
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}>
                </TextInput>
                <Pressable style={styles.submitButton} >
                    <Text style={styles.submitButtonText} onPress={handleAddFood} >Add Food</Text>
                </Pressable>
                <FlatList
                    data={foods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<Food food={{ ...item, index }} onRefresh={onRefresh} />
                    )}
                />
            </View>
        </SafeAreaView>

    )
}