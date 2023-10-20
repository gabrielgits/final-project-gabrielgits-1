import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from './components/About';
import CoursesScreen from './screens/CoursesScreen';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import GlobalContext from './core/context';
import { constServer } from './core/constats';

const Tab = createBottomTabNavigator();

export default function App() {
  const [globalState, setGlobalState] = useState({
    idDepartament: 0,
    courses: [],
  });

  const [loading, setLoading] = useState({ state: true, text: 'Loading...' });

  useEffect(() => {
    const getData = async () => {
      try {
        let id = 0;
        const response = await fetch(constServer + '/departaments');
       
        const obj = await response.json();
        if (obj.success === false) {
          setLoading({
            ...loading,
            text: 'Departament not found, creating...',
          });
          const response = await fetch(constServer+'/departaments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Departament 1', code: 'D1' }),
          });
          const data = await response.json();
          if (data.success === true) {
            id = data.data.insertedId;
          }
        }
        else {
          id = obj.data._id;
        }
        if (id !== 0) {
          setGlobalState({
            ...globalState,
            idDepartament: id,
          });
        }
        setLoading({
          text: 'Finishised',
          state: false,
        });
      } catch (error) {
        setLoading({
          text: error.message,
          state: true,
        });
      }

    }
    getData();
  }, []);

  if (loading.state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }} >{loading.text}</Text>
      </View>
    );
  }

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#0066CC' },
          headerTintColor: '#ccc',
        }}
        >
          <Tab.Screen name="foods" component={CoursesScreen} options={{
            headerShown: false, tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }} />
          <Tab.Screen name="daily" component={About}
            options={{
              headerShown: false, tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="profile" component={About}
            options={{
              headerShown: false, tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
