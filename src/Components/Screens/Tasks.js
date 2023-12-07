import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from '../Parts/Task';
import Context from '../../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeablePanel } from 'rn-swipeable-panel';
import InputTask from '../Parts/InputTask';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Tasks({ navigation }) {

	const [panelProps, setPanelProps] = useState({
		fullWidth: true,
		onlySmall: true,
		closeOnTouchOutside: true,
		noBackgroundOpacity: false,
		showCloseButton: true,
		smallPanelHeight: 250,
		onClose: () => closePanel(),
		onPressCloseButton: () => closePanel(),
	});
	const [isPanelActive, setIsPanelActive] = useState(false);
	const { tasks, addNewTask, deleteTask } = React.useContext(Context);

	const openPanel = () => {
		setIsPanelActive(true);
	};

	const closePanel = () => {
		setIsPanelActive(false);
	};

	const showToast = (msg) => {
		ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
	}

	useEffect(() => {
		AsyncStorage.setItem('tasks', JSON.stringify(tasks));
		return () => {
			AsyncStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={{ flex: 1, alignItems: 'flex-start' }}>
					<MaterialCommunityIcons
						name="menu"
						size={30}
						onPress={() => navigation.toggleDrawer()}
					/>
				</View>
				<View style={{ flex: 2, alignItems: 'center' }}>
					<Text style={styles.headerText}>
						Mes Tâches
					</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end' }}>
					<MaterialCommunityIcons
						name="motion-play"
						size={45}
						color={Colors.SECONDARY}
						onPress={() => {
							if (tasks.length > 0) {
								navigation.navigate('Timer');
							}
							else {
								showToast("Vous n'avez aucune tâche à faire");
							}
						}}
					/>
				</View>
			</View>
			<ScrollView style={styles.tasks}>
				{
					(tasks.length > 0) ?
						tasks.map(task => (
							<Task key={task.id} task={task} navigation={navigation} deleteTask={deleteTask} />
						))
						:
						<View style={styles.noTasks}>
							<Image source={require('../../../assets/images/undraw_Waiting__for_you_ldha-green.png')} style={styles.noTasksImage} />
							<Text style={styles.noTasksText}>Aucune tâche a venir</Text>
							<Text style={styles.noTasksTextDesc}>Vous pouvez ajouter une tâche en cliquant sur le bouton juste en dessous</Text>
						</View>
				}
			</ScrollView>
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
				<KeyboardAvoidingView>
					<InputTask addNewTask={addNewTask} />
				</KeyboardAvoidingView>

			</SwipeablePanel>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GRAY,
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		marginHorizontal: 20,
		borderBottomColor: Colors.PRIMARY,
		borderBottomWidth: 1,
	},
	headerText: {
		color: Colors.PRIMARY,
		fontSize: 20,
		fontWeight: '600',
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
		backgroundColor: Colors.GRAY,
	},
	actionBtn: {
		height: 50,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.PRIMARY,
		borderRadius: 10,
		elevation: 10,
		shadowColor: Colors.PRIMARY,
	},
	actionBtnText: {
		color: Colors.WHITE,
		fontSize: 15,
	},
	noTasks: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		color: Colors.PRIMARY,
	},
	noTasksText: {
		color: Colors.PRIMARY,
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	noTasksTextDesc: {
		color: Colors.PRIMARY,
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
		backgroundColor: Colors.DARK,
		paddingHorizontal: 20,
	},
});
