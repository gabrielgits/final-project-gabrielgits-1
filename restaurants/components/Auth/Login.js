import React, { useContext, useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../core/network';
import { setLocalUser } from '../../core/storage';
import GlobalContext from '../../core/context';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {globalState, setGlobalState} = useContext(GlobalContext);

    const navigation = useNavigation();

    const loginHandle = async () => {
        const obj = await login(email, password);
        console.log(obj);
        if (obj.success) {
            
            await setLocalUser(obj);
            setGlobalState({ ...globalState, login: obj });
        } else {
            Alert.alert(obj.error);
        }
    }

    const goToSignUp = () => {
        navigation.navigate('signup');
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header} >Please insert your credentials</Text>
            <View style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 20,
            }} >
                <TextInput style={styles.input} placeholder="Email"
                    value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password"
                    value={password} onChangeText={setPassword} />
                <Button title="Login" onPress={loginHandle} />
                <Text style={{
                    margin: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }} >Don't have an account?</Text>
                <Button title="Create your account" onPress={goToSignUp} />
            </View>
        </View>
    );
}

