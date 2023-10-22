import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyScreen from "./screens/DailyScreen";
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FoodsScreen from './screens/FoodsScreen';
import { getLocalUser } from './core/storage';
import AuthScreen from './screens/AuthScreen';
import GlobalContext from './core/context';
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {

  const [globalState, setGlobalState] = useState({
    login: null // login = {success: true, token, userId};
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
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <NavigationContainer>
          <AuthScreen />
        </NavigationContainer>
      </GlobalContext.Provider>
    );
  }

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#0066CC" },
            headerTintColor: "#ccc",
          }}
        >
          <Tab.Screen
            name="foods"
            component={FoodsScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="dailylist"
            component={DailyScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  size={24}
                  color={color}
                  name={"note-plus"}
                />
              ),
            }}
          />
          <Tab.Screen name="profile" component={ProfileScreen} options={{
            headerShown: false, tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
