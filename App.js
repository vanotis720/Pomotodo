import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import GlobalState from './src/Context/GlobalState';
import AppDrawer from './src/Components/Navigation/AppDrawer';
import AuthNavigation from './src/Components/Navigation/AuthNavigation';
import { AuthProvider } from './src/Components/providers/AuthProvider';

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
			{/* <GlobalState> */}
				{/* <AppDrawer /> */}
				<AuthNavigation />
			{/* </GlobalState> */}
		</NavigationContainer>
		</AuthProvider>
	);
}