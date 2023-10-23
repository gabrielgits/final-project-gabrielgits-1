import { useContext, useEffect, useState } from "react";
import { Button, View, Text, Image } from "react-native";
import GlobalContext from "../../core/context";
import { useNavigation } from "@react-navigation/native";
import { removeLocalUser } from "../../core/storage";
import { StyleSheet } from "react-native";
import { getUser } from "../../core/network";

export default function ViewProfile() {

    const [user, setUser] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
    });
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const navigation = useNavigation();

    useEffect(() => {
        const getData = async () => {
            const obj = await getUser(globalState.login.token, globalState.login.userId);
            if (obj.success) {
                setUser(obj.data);
            }
        }
        getData();
    }, []);
    const logoutHandle = () => {
        removeLocalUser();
        setGlobalState({ ...globalState, login: null });
    }

    const updateHandle = (user) => {
        setUser(user);        
    }

    const goToChangeProfile = () => {
        navigation.navigate("EditProfile", { user, updateHandle });
    }

    const goToChangePassword = () => {
        navigation.navigate("EditPassword");
    }



    return (
        <View style={styles.Container}>
            <View style={styles.body} >
                <View style={styles.header}>
                    <Image source={{ uri: "https://picsum.photos/150" }} style={styles.image} />
                    <Text style={styles.title} >{user.name}</Text>
                </View>
                <Text style={styles.text}>Email: {user.email}</Text>
                <Text style={styles.text}>Phone: {user.phone}</Text>
                <Text style={styles.text}>Address: {user.address}</Text>
            </View>
            <View style={styles.footer}>
                <Button title="Edit Profile" onPress={goToChangeProfile} />
                <Button title="Change Password" onPress={goToChangePassword} />

            </View>
            <Button title="Logout" onPress={logoutHandle} />
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
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,
        color: "#0066CC",
        fontWeight: "bold",
        marginTop: 20,
    },

    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        borderRadius: 100,
    }
});