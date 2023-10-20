import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesList from '../components/CoursesList';
import CourseDetails from '../components/CourseDetails';
import AddReview from '../components/AddReview';
import AddCourse from '../components/AddCourse';
import EditCourse from '../components/EditCourse';
const Stack = createNativeStackNavigator();

export default function CoursesScreen() {
    return (
        <Stack.Navigator 
        initialRouteName="courses">
            <Stack.Screen name="courses" component={CoursesList} options={{ headerShown: false }} />
            <Stack.Screen name="details" component={CourseDetails} options={{ title: 'Course Details' }} />
            <Stack.Screen name="add-review" component={AddReview} options={{ title: 'Add Review',  }} />
            <Stack.Screen name="add-course" component={AddCourse} options={{ title: 'Add Course',  }} />
            <Stack.Screen name="edit-course" component={EditCourse} options={{ title: 'Edit Course',  }} />
        </Stack.Navigator>
    );
}