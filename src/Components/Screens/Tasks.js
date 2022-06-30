/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from '../Parts/Task';

var tasks = [{
	id: '1',
	title: 'Task 1',
	url: 'file:///storage/emulated/0/Download/mood_mp3_26655.mp3',
}, {
	id: '2',
	title: 'Task 2',
	url: 'file:///storage/emulated/0/Download/alan_walker_alone_mp3_46103.mp3',
}];


export default function Tasks({ navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.header}>
				<Text style={styles.headerText}>Mes Tâches</Text>
				<TouchableOpacity onPress={() => { alert('start') }}>
					<MaterialCommunityIcons name="motion-play" size={30} style={styles.icon} />
				</TouchableOpacity>
			</View>

			<View style={styles.tasks}>
				{
					tasks.map(task => (
						<Task key={task.id} task={task} navigation={navigation} />
					))
				}
			</View>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.actionWrapper}>
				<TextInput style={styles.actionInput} placeholder="Ajouter une tâche" />
				<TouchableOpacity style={styles.actionBtn} onPress={() => { navigation.navigate('AddTask') }}>
					<MaterialCommunityIcons name="plus" size={30} color={Colors.RED} />
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.DARK,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	header: {
		height: '10%',
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: Colors.SECONDARY,
		borderBottomWidth: 1,
	},
	headerText: {
		flex: 1,
		color: Colors.WHITE,
		fontSize: 32,
		fontWeight: 'bold',
	},
	icon: {
		flex: 1,
		color: Colors.RED,
		fontSize: 40,
		alignItems: 'center',
	},
	tasks: {
		flex: 5,
		marginTop: 20,
	},
	actionWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 20,
		height: '10%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	actionBtn: {
		height: 54,
		width: 54,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.WHITE,
		borderRadius: 30,
		borderColor: Colors.SECONDARY,
		borderWidth: 1,
	},
	actionInput: {
		height: 54,
		width: '80%',
		backgroundColor: Colors.SECONDARY,
		borderColor: Colors.WHITE,
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 10,
		color: Colors.SECONDARY,
		fontSize: 18,
		fontWeight: 'bold',
	}
});
