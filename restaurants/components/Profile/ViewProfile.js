import { useContext } from "react";
import { Button, View } from "react-native";
import GlobalContext from "../../core/context";
import { useNavigation } from "@react-navigation/native";
import { removeLocalUser } from "../../core/storage";

export default function ViewProfile() {

    const {globalState, setGlobalState} = useContext(GlobalContext);

    const navigation = useNavigation();

    const logoutHandle = () => {
        removeLocalUser();
        setGlobalState({ ...globalState, login: null });
    }

    return (
        <View>
            <Button title="Logout" onPress={logoutHandle} />
        </View>
    );
}