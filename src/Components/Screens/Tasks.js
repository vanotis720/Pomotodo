/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	Text, View, StyleSheet, TouchableOpacity,
	TextInput, KeyboardAvoidingView, Platform, Keyboard,
	Image, ScrollView
} from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from '../Parts/Task';
import Context from '../../Context/context';

export default function Tasks({ navigation }) {

	const { tasks, addNewTask, deleteTask, removeFirstTask } = React.useContext(Context);
	const [task, setTask] = React.useState('');

	const handleAddTask = () => {
		addNewTask(task);
		setTask('');
		Keyboard.dismiss();
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.header}>
				<Text style={styles.headerText}>Mes Tâches</Text>
				<TouchableOpacity onPress={() => {
					if (tasks.length > 0) {
						navigation.navigate('Timer');
					}
				}}>
					<MaterialCommunityIcons name="motion-play" size={30} style={styles.icon} />
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.tasks}>
				{
					(tasks.length > 0) ?
						tasks.map(task => (
							<Task key={task.id} task={task} navigation={navigation} deleteTask={deleteTask} />
						))
						:
						<View style={styles.noTasks}>
							<Image source={require('../../assets/images/no-tasks.png')} style={styles.noTasksImage} />
							<Text style={styles.noTasksText}>Aucune tâche n'a été ajoutée</Text>
							<Text style={styles.noTasksTextDesc}>Vous pouvez ajouter une tâche en cliquant sur le bouton +</Text>
						</View>
				}
			</ScrollView>

			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.actionWrapper}>
				<TextInput
					style={styles.actionInput}
					placeholder="Ajouter une tâche"
					value={task}
					onChangeText={(text) => setTask(text)}
					onSubmitEditing={() => handleAddTask()}
				/>
				<TouchableOpacity
					style={styles.actionBtn}
					onPress={() => handleAddTask()}
				>
					<MaterialCommunityIcons name="plus" size={30} color={Colors.RED} />
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: Colors.DARK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		height: '10%',
		width: '90%',
		marginTop: 40,
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
		height: '70%',
		width: '90%',
		marginVertical: 5,

	},
	actionWrapper: {
		position: 'absolute',
		height: '10%',
		width: '90%',
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 10,
		backgroundColor: Colors.DARK,
	},
	actionBtn: {
		height: 54,
		width: 54,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.WHITE,
		borderRadius: 30,
		marginStart: 10,
	},
	actionInput: {
		height: 54,
		width: '80%',
		backgroundColor: Colors.SECONDARY,
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 10,
		color: Colors.DARK,
		fontSize: 18,
		fontWeight: 'bold',
		marginStart: 10,
	},
	noTasks: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	noTasksText: {
		color: Colors.WHITE,
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	noTasksTextDesc: {
		color: Colors.SECONDARY,
		fontSize: 15,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
	},
	noTasksImage: {
		width: 120,
		height: 120,
		marginBottom: 20,
	}
});
