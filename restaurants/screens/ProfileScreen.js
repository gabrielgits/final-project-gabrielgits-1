import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewProfile from '../components/Profile/ViewProfile';
const Stack = createNativeStackNavigator();
export default function ProfileScreen() {

    return (
        <Stack.Navigator 
        initialRouteName="viewprofile">
            <Stack.Screen name="login" component={ViewProfile}  />
        </Stack.Navigator>
    );
}