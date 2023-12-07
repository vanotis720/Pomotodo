import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStackNavigation from './AppStackNavigation';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="App"
                component={AppStackNavigation}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
}