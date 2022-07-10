import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./src/Components/Navigation/AppStackNavigation";
import GlobalState from './src/Context/GlobalState';

export default function App() {
	return (
		<NavigationContainer>
			<GlobalState>
				<AppStackNavigation />
			</GlobalState>
		</NavigationContainer>
	);
}