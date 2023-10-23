
import React, { useContext, useState } from 'react';
import styles from '../../styles/general';
import { Button, View, TextInput, Text, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../../core/network';
import GlobalContext from '../../core/context';
import { setLocalUser } from '../../core/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function Signup() {
    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        confirmPassword: "",
        image: null,
    })
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const navigation = useNavigation();

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setState({ ...state, image: result.assets[0].uri });
            const directory = FileSystem.documentDirectory + 'Pictures/';
            const filename = 'image_' + Date.now() + '.jpg';
            const fileUri = directory + filename;
            try {
                await FileSystem.copyAsync({
                    from: imageUri,
                    to: fileUri,
                });
                setState({ ...state, image: fileUri });
            } catch (error) {
                console.error('Error saving the image:', error);
            }
        }
    };

    const signupHandle = async () => {
        const obj = await signup({ ...state });
        if (obj && obj.success) {
            await setLocalUser(obj);
            setGlobalState({ ...globalState, login: obj });
        } else {
            Alert.alert(obj.error);
        }
    }

    const goToLogin = () => {
        navigation.navigate('login');
    }

    return (
        <ScrollView>
            <View style={styles.container} >
                <Text style={styles.header} >Please insert your details</Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 20,
                }} >

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        {state.image && (
                            <Image
                                source={{ uri: state.image }}
                                style={{ width: 100, height: 100, borderRadius: 50, margin: 10 }}
                            />
                        )}
                        <Button title="Select Image" onPress={selectImage} />
                    </View>
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
        </ScrollView>
    );
}

