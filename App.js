import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./src/Components/Navigation/AppStackNavigation";

export default function App() {
	return (
		<NavigationContainer>
			<AppStackNavigation />
		</NavigationContainer>
	);
}