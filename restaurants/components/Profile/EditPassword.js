
import React, { useContext, useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../core/context';
import { changePassword } from '../../core/network';

export default function EditPassword() {
    const [state, setState] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    })
    const { globalState } = useContext(GlobalContext);

    const navigation = useNavigation();

    const updateHandle = async () => {
        const obj = await changePassword(globalState.login.token, globalState.login.userId, state);
        if (obj.success) {
            navigation.goBack();
            return;
        }
        Alert.alert(obj.error);
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header} >Please insert your credentials</Text>
            <View style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 20,
            }} >
                <TextInput style={styles.input} placeholder="Old Password"
                    value={state.oldPassword} secureTextEntry={true} onChangeText={(text) => setState({ ...state, oldPassword: text })} />
                <TextInput style={styles.input} placeholder="Password"
                    value={state.password} secureTextEntry={true} onChangeText={(text) => setState({ ...state, password: text })} />
                <TextInput style={styles.input} placeholder="Confirm Password"
                    value={state.confirmPassword} secureTextEntry={true} onChangeText={(text) => setState({ ...state, confirmPassword: text })} />
                <Button title="Update Password" onPress={updateHandle} />
            </View>
        </View>
    );
}

