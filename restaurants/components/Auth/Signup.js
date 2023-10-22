
import React, { useContext, useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../../core/network';
import GlobalContext from '../../core/context';
import { setLocalUser } from '../../core/storage';

export default function Signup() {
    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        confirmPassword: "",
    })
    const {globalState, setGlobalState} = useContext(GlobalContext);

    const navigation = useNavigation();

    const signupHandle = async () => {
        const obj = await signup({...state});
        if ( obj && obj.success) {
            // obj = {success: true, token, userId};;
            await setLocalUser(obj);
            setGlobalState({ ...globalState, login: obj });
        } else {
            Alert.alert(obj.error);
            console.log(obj.error)
        }
    }

    const goToLogin = () => {
        navigation.navigate('login');
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header} >Please insert your details</Text>
            <View style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 20,
            }} >
                <TextInput style={styles.input} placeholder="Name"
                    value={state.name} onChangeText={(text) => setState({ ...state, name: text })} />
                <TextInput style={styles.input} placeholder="Phone"
                    value={state.phone} onChangeText={(text) => setState({ ...state, phone: text })} />
                <TextInput style={styles.input} placeholder="Email"
                    value={state.email} onChangeText={(text) => setState({ ...state, email: text })} />
                <TextInput style={styles.input} placeholder="Address"
                    value={state.address} onChangeText={(text) => setState({ ...state, address: text })} />
                <TextInput style={styles.input} placeholder="Password"
                    value={state.password} secureTextEntry={true} onChangeText={(text) => setState({ ...state, password: text })} />
                <TextInput style={styles.input} placeholder="Confirm Password"
                    value={state.confirmPassword} secureTextEntry={true} onChangeText={(text) => setState({ ...state, confirmPassword: text })} />
                <Button title="Signup" onPress={signupHandle} />
                <Text style={{
                    margin: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }} >You already have an account?</Text>
                <Button title="Login in your account" onPress={goToLogin} />
            </View>
        </View>
    );
}

