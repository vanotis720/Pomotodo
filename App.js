import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./src/Components/Navigation/AppStackNavigation";
import GlobalState from './src/Context/GlobalState';
import AppDrawer from './src/Components/Navigation/AppDrawer';

export default function App() {
	return (
		<NavigationContainer>
			<GlobalState>
				<AppDrawer />
			</GlobalState>
		</NavigationContainer>
	);
}