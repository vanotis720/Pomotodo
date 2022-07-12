import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import GlobalState from './src/Context/GlobalState';
import AppDrawer from './src/Components/Navigation/AppDrawer';
import Onboard from './src/Components/Screens/Onboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const { firstTime, setFirstTime } = React.useState(true);

	// get firstTime in storage
	const getFirstTime = () => {
		const first = AsyncStorage.getItem('firstTime');
		setFirstTime(first)
	}

	return (
		<NavigationContainer>
			<GlobalState>
				{firstTime ? <Onboard /> : <AppDrawer />}
			</GlobalState>
		</NavigationContainer>
	);
}