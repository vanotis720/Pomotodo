/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../utilities/Color';

export default function About({ navigation }) {

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BACKGROUND
	},
});
