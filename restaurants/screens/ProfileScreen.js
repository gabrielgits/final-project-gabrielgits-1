import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewProfile from '../components/Auth/ViewProfile';
const Stack = createNativeStackNavigator();
export default function AuthPerfile() {

    return (
        <Stack.Navigator 
        initialRouteName="viewprofile">
            <Stack.Screen name="login" component={ViewProfile}  />
        </Stack.Navigator>
    );
}