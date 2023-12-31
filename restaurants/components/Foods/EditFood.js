import { Text, Pressable, TextInput, View } from "react-native"
import React, { useState, useContext } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { editFood } from "../../core/network";
import styles from "../../styles/appStyles";
import GlobalContext from "../../core/context";

export default function EditFood() {
    const {globalState, setGlobalState}=useContext(GlobalContext);

    const navigation = useNavigation();
    const route = useRoute();
    const { food, onRefresh } = route.params;

    const [state, setState] = useState(
        {
            _id: food._id,
            name: food.name,
            price: food.price,
            origin: food.origin,
            date: food.date,
            image: food.image
        })

    const handleSubmit = async () => {
        try {
            await editFood(state, globalState.login.token, globalState.login.userId);
            onRefresh();
            navigation.goBack()
        } catch (error) {

        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Edit Course</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={state.name}
                onChangeText={(text) => setState({ ...state, name: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={state.price}
                onChangeText={(text) => setState({ ...state, price: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Origin"
                value={state.origin}
                onChangeText={(text) => setState({ ...state, origin: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="yyyy-mm-dd"
                keyboardType="numeric"
                value={state.date}
                onChangeText={(text) => setState({ ...state, date: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Image"
                value={state.image}
                onChangeText={(text) => setState({ ...state, image: text })}
            ></TextInput>
            <Pressable style={styles.submitButton} >
                <Text style={styles.submitButtonText} onPress={handleSubmit} >Save</Text>
            </Pressable>
        </View>
    )
}