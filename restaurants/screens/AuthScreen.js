import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
const Stack = createNativeStackNavigator();
export default function AuthScreen() {

    return (
        <Stack.Navigator 
        initialRouteName="login">
            <Stack.Screen name="login" component={Login}  />
            <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
    );
}