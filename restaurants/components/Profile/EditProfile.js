import { useContext, useEffect, useState } from "react";
import { Button, View, Text, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GlobalContext from "../../core/context";
import { editUser } from "../../core/network";

export default function EditProfile({ route: {params}}) {

    const {user:userOld, updateHandle} = params;

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const navigation = useNavigation();
    const { globalState, setGlobalState } = useContext(GlobalContext);

    useEffect(() => {
        setUser(userOld);
    }, []);

    const updatePress = async () => {
        const obj = await editUser(globalState.login.token, globalState.login.userId, user);
        if (obj.success) {
            updateHandle(user);
            navigation.goBack();
            return;         
        }
        confirm(obj.error);
    }

    return (
        <View style={styles.Container}>
            <View style={styles.body} >
                <View style={styles.header}>
                    <Image source={{ uri: "https://picsum.photos/150" }} style={styles.image} />
                </View>
                <TextInput style={styles.text} placeholder="Name" value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })} />
                <TextInput style={styles.text} placeholder="Email" value={user.email}
                    onChangeText={(text) => setUser({ ...user, email: text })} />
                <TextInput style={styles.text} placeholder="Phone" value={user.phone}
                    onChangeText={(text) => setUser({ ...user, phone: text })} />
                <TextInput style={styles.text} placeholder="Address" value={user.address}
                    onChangeText={(text) => setUser({ ...user, address: text })} />
            </View>
            <Button title="Update Profile" onPress={updatePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10,

    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        padding: 10,
        height: "70%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: "space-around",
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        height: 50,
        padding: 10,
        color: "#0066CC",
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#ddd",
    },

    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        borderRadius: 100,
    }
});