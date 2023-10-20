import { Text, Pressable, TextInput, View } from "react-native"
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from "../../styles/appStyles";
import { addFood } from '../../core/network';
import GlobalContext from "../../core/context";

export default function AddFood() {

    const {globalstate, setGlobalState}=useContext(GlobalContext);

    const navigation = useNavigation();
    const [state, setState] = useState(
        {
            name: "",
            price: 0,
            origin: "",
            date: "",
            image: ""
        })

    const route = useRoute();
    const { onRefresh } = route.params;

    const handleSave = async () => {
        try {
            const ret = await addFood(state);
            onRefresh();
            let d=0/5
            navigation.goBack();
        } catch (error) {
            setGlobalState({...globalstate, errorMessage:'Unable to save data'})
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Add New Food</Text>
            <Text style={styles.errorMsg}>{globalstate.errorMessage} </Text>
            <TextInput
                style={styles.input}
                placeholder="name"
                value={state.name}
                onChangeText={(text) => setState({ ...state, name: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="price"
                keyboardType="numeric"
                value={state.price}
                onChangeText={(text) => setState({ ...state, price: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="origin"
                value={state.origin}
                onChangeText={(text) => setState({ ...state, origin: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="mm/dd/yyyy"
                value={state.date}
                onChangeText={(text) => setState({ ...state, date: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="image"
                value={state.image}
                onChangeText={(text) => setState({ ...state, image: text })}
            ></TextInput>
            <Pressable style={styles.submitButton} >
                <Text style={styles.submitButtonText} onPress={handleSave} >Save</Text>
            </Pressable>

        </View>
    )
}
