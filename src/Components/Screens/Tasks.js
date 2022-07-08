/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from '../Parts/Task';
import Context from '../../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeablePanel } from 'rn-swipeable-panel';
import InputTask from '../Parts/InputTask';



export default function Tasks({ navigation }) {

	const [panelProps, setPanelProps] = useState({
		fullWidth: true,
		closeOnTouchOutside: true,
		allowTouchOutside: true,
		onClose: () => closePanel(),
		onlySmall: true,
		noBackgroundOpacity: true,
		showCloseButton: true,

	});
	const [isPanelActive, setIsPanelActive] = useState(false);
	const { tasks, addNewTask, deleteTask, removeFirstTask } = React.useContext(Context);

	const openPanel = () => {
		setIsPanelActive(true);
	};

	const closePanel = () => {
		setIsPanelActive(false);
	};

	// update storage task when component unmount
	useEffect(() => {
		AsyncStorage.setItem('tasks', JSON.stringify(tasks));
		return () => {
			console.log("storage update");
			AsyncStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}
		, [tasks]);


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

			{/* <View style={{ height: '85%' }}> */}
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
			{/* </View> */}

			<View style={styles.actionWrapper}>
				<TouchableOpacity
					style={styles.actionBtn}
					onPress={() => openPanel()}
				>
					<Text style={styles.actionBtnText}>AJOUTER UNE TACHE</Text>
				</TouchableOpacity>
			</View>

			<SwipeablePanel
				{...panelProps} isActive={isPanelActive}
				style={styles.swipable}
				closeRootStyle={{ backgroundColor: Colors.DARK }}
			>
				<InputTask addNewTask={addNewTask} />
			</SwipeablePanel>
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
	icon: {
		flex: 1,
		color: Colors.WHITE,
		fontSize: 45,
		alignItems: 'center',
		elevation: 5,
		shadowColor: Colors.GRAY,
	},
	tasks: {
		width: '90%',
		marginTop: 5,
		marginBottom: '25%',
	},
	actionWrapper: {
		position: 'absolute',
		height: '10%',
		width: '100%',
		bottom: 5,
		alignItems: 'center',
		paddingTop: 10,
		backgroundColor: Colors.BACKGROUND,
	},
	actionBtn: {
		height: 50,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.GRAY,
		borderRadius: 10,
		elevation: 10,
		shadowColor: Colors.WHITE,
	},
	actionBtnText: {
		color: Colors.TEXT,
		fontSize: 15,
	},
	noTasks: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		color: Colors.TEXT,
	},
	noTasksText: {
		color: Colors.TEXT,
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
	},
	swipable: {
		backgroundColor: Colors.GRAY,
		paddingHorizontal: 20,
	},
});
