import 'react-native-gesture-handler';
import * as React from 'react';
import AppRoute from './src/Components/Navigation/AppRoute';
import { GlobalProvider } from './src/Context/GlobalContext';

export default function App() {
	return (
		<GlobalProvider>
			<AppRoute />
		</GlobalProvider>
	);
}