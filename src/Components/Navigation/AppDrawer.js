import { createDrawerNavigator } from '@react-navigation/drawer';
import About from '../Screens/About';
import AppBottom from './AppBottom';
import AppStackNavigation from './AppStackNavigation';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="App"
                component={AppBottom}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="About"
                title="À propos"
                component={About}
                options={{
                    headerShown: true,
                }}
            />
        </Drawer.Navigator>
    );
}