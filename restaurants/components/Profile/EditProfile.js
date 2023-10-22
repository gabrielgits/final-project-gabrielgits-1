import { useContext, useEffect, useState } from "react";
import { Button, View, Text, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GlobalContext from "../../core/context";

export default function EditProfile({ route: {params}}) {

    const [user, setUser] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
    });
    const navigation = useNavigation();
    const { globalState, setGlobalState } = useContext(GlobalContext);

    useEffect(() => {
        const user = params.user;
        setUser(user);
    }, []);

    const goToChangePassword = () => {
        navigation.navigate("changePassword");
    }

    return (
        <View style={styles.Container}>
            <View style={styles.body} >
                <View style={styles.header}>
                    <Image source={{ uri: "https://picsum.photos/150" }} style={styles.image} />
                </View>
                <Text style={styles.text} placeholder="Name" value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })} />
                <TextInput style={styles.text} placeholder="Email" value={user.email}
                    onChangeText={(text) => setUser({ ...user, email: text })} />
                <TextInput style={styles.text} placeholder="Phone" value={user.phone}
                    onChangeText={(text) => setUser({ ...user, phone: text })} />
                <TextInput style={styles.text} placeholder="Address" value={user.address}
                    onChangeText={(text) => setUser({ ...user, address: text })} />
            </View>
            <Button title="Update Profile" onPress={goToChangePassword} />
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