import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewProfile from '../components/Profile/ViewProfile';
import EditProfile from '../components/Profile/EditProfile';
import EditPassword from '../components/Profile/EditPassword';
const Stack = createNativeStackNavigator();
export default function ProfileScreen() {

    return (
        <Stack.Navigator 
        initialRouteName="ViewProfile">
            <Stack.Screen name="ViewProfile" component={ViewProfile}  />
            <Stack.Screen name="EditProfile" component={EditProfile}  />
            <Stack.Screen name="EditPassword" component={EditPassword}  />
    
        </Stack.Navigator>
    );
}