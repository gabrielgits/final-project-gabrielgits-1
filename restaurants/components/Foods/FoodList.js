import { getFoodList } from '../../core/network';
import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
import styles from '../../styles/appStyles';
import Food from './Food';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../core/context';

export default function FoodList() {

    const { globalState, setGlobalState } = useContext(GlobalContext); // get token

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
                const ret = await getFoodList(globalState.login.token, globalState.login.userId);
                //console.log(ret.data.data)
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

    let myfoodlist = []

    if (searchText !== "" && foods.length>0) {
        myfoodlist = [...foods].filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    } else {
        myfoodlist = foods;
    }


    return (
        <SafeAreaView
            style={styles.root}>
            <View style={{ flex: 0.2 }}>
                <Text style={styles.title}> Foods InStock</Text>
            </View >
            <View style={{ flex: 0.8 }}>
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
                    data={myfoodlist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<Food food={{ ...item, index }} onRefresh={onRefresh} />
                    )}
                />
            </View>
        </SafeAreaView>

    )
}


