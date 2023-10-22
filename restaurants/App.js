import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FoodsScreen from './screens/FoodsScreen';
import { getLocalUser } from './core/storage';
import AuthScreen from './screens/AuthScreen';
import GlobalContext from './core/context';

const Tab = createBottomTabNavigator();

export default function App() {

  const [globalState, setGlobalState] = useState({
    login: null
  });

  React.useEffect(() => {
    async function getData() {
      const login = await getLocalUser();
      setGlobalState({ ...globalState, login });
    }
    getData();
  }, []);

  if (!globalState.login) {
    return (
      <GlobalContext.Provider value={{globalState, setGlobalState}}>
        <NavigationContainer>
          <AuthScreen />
        </NavigationContainer>
      </GlobalContext.Provider>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#0066CC' },
        headerTintColor: '#ccc',
      }}
      >
        <Tab.Screen name="foods" component={FoodsScreen} options={{
          headerShown: false, tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="profile" component={Pro} options={{
          headerShown: false, tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="person" color={color} size={26} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
