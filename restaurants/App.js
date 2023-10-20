import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FoodsScreen from './screens/FoodsScreen';
import GlobalContext from './core/context'

const Tab = createBottomTabNavigator();

export default function App() {
  const [globalstate, setGlobalState]=useState({errorMessage: ''});

  return (
    <GlobalContext.Provider value={{ globalstate, setGlobalState }}>
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

        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
