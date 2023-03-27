import 'react-native-gesture-handler';
import * as React from 'react';
import { AuthProvider } from './src/Components/providers/AuthProvider';
import AppRoute from './src/Components/Navigation/AppRoute';

export default function App() {
	return (
		<AuthProvider>
			<AppRoute />
		</AuthProvider>
	);
}