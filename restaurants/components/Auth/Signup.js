
import React, { useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text } from 'react-native';

export default function Signup() {
    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        confirmPassword: "",
    })

    const signup = () => {

    }

    const goToLogin = () => {
        
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header} >Please insert your email and password</Text>
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
                <TextInput style={styles.input} placeholder="Password"
                    value={state.password} onChangeText={(text) => setState({ ...state, password: text })} />
                <TextInput style={styles.input} placeholder="Confirm Password"
                    value={state.confirmPassword} onChangeText={(text) => setState({ ...state, confirmPassword: text })} />
                <Button title="Signup" onPress={signup} />
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

