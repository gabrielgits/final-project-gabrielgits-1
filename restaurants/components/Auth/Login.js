import React, { useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {

    }

    const goToSignUp = () => {
        
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header} >Please insert your email and password</Text>
            <View style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 20,
            }} >
                <TextInput style={styles.input} placeholder="Email"
                    value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password"
                    value={password} onChangeText={setPassword} />
                <Button title="Login" onPress={login} />
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

