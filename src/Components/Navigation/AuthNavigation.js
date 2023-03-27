/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../Screens/Tasks';
import Timer from '../Screens/Timer';
import { LoginView } from '../Screens/Login';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName="Tasks">
            <Stack.Screen
                name="Login"
                component={LoginView}
                options={{
                    headerShown: false,
                    title: 'Pomotodo - authentification'
                }}
            />
        </Stack.Navigator>
    );
}
