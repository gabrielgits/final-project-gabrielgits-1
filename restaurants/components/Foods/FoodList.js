import { getFoodList } from '../../core/network';
import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import Food from './Food';

export default function FoodList() {
    const [searchText, setSearchText] = useState('');
    const [foods, setFood]=useState([]);
    const [refresh, setRefresh]=useState(false);

    const onRefresh=()=>{
        setRefresh(!refresh)
    }

    useEffect(async () => {
        try {
            const ret = await getFoodList()
            setFood(ret);
        } catch (error) {

        }
    }, [])

    const handleAddFood=()=>{

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
                    renderItem={({ item, index }) => (<Food data={{ ...item, index }} onRefresh={onRefresh} />
                    )}
                />
            </View>
        </SafeAreaView>

    )
}