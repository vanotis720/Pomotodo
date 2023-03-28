/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from '../Screens/Tasks';
import Timer from '../Screens/Timer';
import { LoginView } from '../Screens/Login';
import { RegisterView } from '../Screens/Register';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginView}
                options={{
                    headerShown: false,
                    title: 'Pomotodo - authentification'
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterView}
                options={{
                    headerShown: false,
                    title: 'Pomotodo - authentification'
                }}
            />
        </Stack.Navigator>
    );
}
