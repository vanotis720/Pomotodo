/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph
} from 'react-native-chart-kit'

const data = {
	labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
	datasets: [{
		data: [
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
			Math.random() * 100,
		]
	}]
};

const dataRing = {
	labels: ["Run", "Bike", "Run"], // optional
	data: [0.4, 0.6, 0.8]
};


const dataPie = [
	{
		name: "Seoul",
		population: 21500000,
		color: "rgba(131, 167, 234, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15
	},
	{
		name: "Toronto",
		population: 2800000,
		color: "#F00",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15
	},
	{
		name: "Beijing",
		population: 527612,
		color: "red",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15
	},
	{
		name: "New York",
		population: 8538000,
		color: "#ffffff",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15
	},
	{
		name: "Moscow",
		population: 11920000,
		color: "rgb(0, 0, 255)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15
	}
];

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function Stats({ navigation }) {

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.header}>
				<Text style={styles.headerText}>
					Productivité
				</Text>
				<MaterialCommunityIcons
					name="menu"
					color={Colors.WHITE}
					size={30}
					onPress={() => navigation.toggleDrawer()}
				/>
			</View>
			<ScrollView style={styles.stats}>
				<View style={styles.overview}>
					<View style={styles.card}>
						<MaterialCommunityIcons
							name="timer"
							style={styles.cardIcon}
						/>
						<Text style={styles.cardText}>25 Minutes</Text>
					</View>
					<View style={styles.card}>
						<MaterialCommunityIcons
							name="view-list"
							style={styles.cardIcon}
						/>
						<Text style={styles.cardText}>25 tâches</Text>
					</View>
				</View>
				<LineChart
					data={data}
					width={screenWidth - 10}
					height={screenHeight / 4}
					chartConfig={{
						backgroundColor: Colors.GRAY,
						backgroundGradientFrom: Colors.DARK,
						backgroundGradientTo: Colors.GRAY,
						decimalPlaces: 0,
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					}}
					bezier
					style={styles.chartLine}
				/>
				<ProgressChart
					data={dataRing}
					width={screenWidth - 10}
					height={220}
					strokeWidth={15}
					radius={30}
					chartConfig={{
						backgroundColor: Colors.GRAY,
						backgroundGradientFrom: Colors.DARK,
						backgroundGradientTo: Colors.GRAY,
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						}
					}}
					hideLegend={true}
					style={styles.chartLine}
				/>

				<PieChart
					data={dataPie}
					width={screenWidth - 10}
					height={220}
					chartConfig={{
						backgroundColor: Colors.GRAY,
						backgroundGradientFrom: Colors.DARK,
						backgroundGradientTo: Colors.GRAY,
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						}
					}}
					accessor={"population"}
					backgroundColor={"transparent"}
					style={styles.chartLine}
					paddingLeft={"15"}
				/>

			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: Colors.BACKGROUND,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		height: '8%',
		width: '90%',
		marginTop: 45,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: Colors.TEXT,
		borderBottomWidth: 1,
	},
	headerText: {
		flex: 1,
		color: Colors.WHITE,
		fontSize: 32,
		fontWeight: 'bold',
	},
	stats: {
		width: '100%',
		height: '92%',
		marginTop: 5,
		marginBottom: '1%',
	},
	overview: {
		height: screenHeight / 4,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'center',
	},
	chartLine: {
		flex: 1,
		marginVertical: 10,
		borderRadius: 20,
		margin: 5,
	},
	card: {
		flex: 1,
		backgroundColor: Colors.GRAY,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		borderRadius: 20,
	},
	cardText: {
		color: '#AAA8B3',
		fontSize: 20,
		marginTop: 10
	},
	cardIcon: {
		color: Colors.WHITE,
		fontSize: 50
	}
});

