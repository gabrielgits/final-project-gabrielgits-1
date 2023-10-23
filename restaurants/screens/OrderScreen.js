import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCart from '../components/Order/AddCart';
import ReviewCart from '../components/Order/ReviewCart';
const Stack = createNativeStackNavigator();
export default function FoodsScreen() {
    return (
        <Stack.Navigator
            initialRouteName="addcart">
            <Stack.Screen name="addcart" component={AddCart} options={{ title: 'Choose Foods' }} />
            <Stack.Screen name="reviewcart" component={ReviewCart} options={{ title: 'Review Cart' }} />
        </Stack.Navigator>
    );
}