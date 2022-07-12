import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utilities/Color';
import AppStackNavigation from './AppStackNavigation';


const Tab = createBottomTabNavigator();

export default function AppBottom() {

    return (
        <Tab.Navigator
            initialRouteName="AppStackNavigation"
            screenOptions={{
                tabBarActiveTintColor: Colors.WHITE,
                tabBarInactiveTintColor: Colors.SECONDARY,
                tabBarShowLabel: true,
                tabBarStyle: {
                    // height: 60,
                    backgroundColor: Colors.BACKGROUND,
                },
            }}
        >
            <Tab.Screen
                name="AppStackNavigation"
                component={AppStackNavigation}
                options={{
                    tabBarLabel: 'Aujourd\'hui',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Mes projets"
                component={AppStackNavigation}
                options={{
                    tabBarLabel: 'Mes projets',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Stats"
                component={AppStackNavigation}
                options={{
                    tabBarLabel: 'Statistiques',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}