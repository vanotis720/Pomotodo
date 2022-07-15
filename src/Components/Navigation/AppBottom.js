import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utilities/Color';
import AppStackNavigation from './AppStackNavigation';
import Projects from '../Screens/Projects';
import Stats from '../Screens/Stats';


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
                component={Projects}
                options={{
                    tabBarLabel: 'Mes projets',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="list-status" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Stats"
                component={Stats}
                options={{
                    tabBarLabel: 'Statistiques',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-arc" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}