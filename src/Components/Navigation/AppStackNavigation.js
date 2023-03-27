/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../Screens/Tasks';
import Timer from '../Screens/Timer';

const Stack = createNativeStackNavigator();

export default function AppStackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Tasks">
            <Stack.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Timer"
                component={Timer}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
