import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartList from '../components/Order/CartList';
import ReviewCart from '../components/Order/ReviewCart';
const Stack = createNativeStackNavigator();
export default function FoodsScreen() {
    return (
        <Stack.Navigator
            initialRouteName="cartlist">
            <Stack.Screen name="cartlist" component={CartList} options={{ title: 'Choose Foods' }} />
            <Stack.Screen name="reviewcart" component={ReviewCart} options={{ title: 'Review Cart' }} />
        </Stack.Navigator>
    );
}