import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../providers/AuthProvider';
import AppDrawer from './AppDrawer';
import AuthNavigation from './AuthNavigation';
import { TodosProvider } from '../providers/TodosProvider';


const AppRoute = () => {

    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user != null ? (
                <TodosProvider>
                    <AppDrawer />
                </TodosProvider>
            ) : <AuthNavigation />}
        </NavigationContainer>
    )
}
export default AppRoute
