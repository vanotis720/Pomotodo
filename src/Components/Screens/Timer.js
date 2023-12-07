import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { formatSecondsToTime } from '../../helpers/cast';
import Colors from '../../utilities/Color';
import Context from '../../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Foundation, Feather } from '@expo/vector-icons';

const POMOTIME = 25 * 60;
const BREAKTIME = 5 * 60;
const LONGBREAKTIME = 15 * 60;

export default function Timer({ navigation }) {

	const { tasks, removeFirstTask, sendTaskToBottom } = React.useContext(Context);
	const [currentTask, setCurrentTask] = React.useState('');
	const [pomotype, setPomotype] = React.useState('WORK');
	const [pomoTour, setPomoTour] = React.useState(1);
	const [isPlaying, setIsPlaying] = React.useState(true);
	const [timerKey, setTimerKey] = React.useState(new Date());

	const showToast = (msg) => {
		ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
	}

	useEffect(() => {
		if (tasks.length > 0) {
			setCurrentTask(tasks[0]);
		}
		return () => {
			AsyncStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks]);

	const handleTimerEnd = () => {
		if (pomotype === 'WORK') {
			createTwoButtonAlert();
			setPomoTour(pomoTour + 1);

			if (pomoTour === 3) {
				setPomoTour(0);
				setPomotype('LONGBREAK');
			}
			else {
				setPomotype('BREAK');
			}
		}
		else {
			setPomotype('WORK');
		}
	}

	const getTime = () => {
		if (pomotype === 'WORK') {
			return POMOTIME;
		}
		else if (pomotype === 'BREAK') {
			return BREAKTIME;
		}
		else if (pomotype === 'LONGBREAK') {
			return LONGBREAKTIME;
		}
	}

	const getPomotypeText = () => {
		if (pomotype === 'WORK') {
			return currentTask.title;
		}
		else if (pomotype === 'BREAK') {
			return 'Pause courte';
		}
		else if (pomotype === 'LONGBREAK') {
			return 'Pause longue';
		}
	}

	const handleNextTaskBtn = () => {
		Alert.alert(
			"Tâche suivante !",
			"Passer la tâche actuelle en bas de la liste ?",
			[
				{
					text: "Non",
					onPress: () => {
						showToast('Bonne décision, reste concentré')
					},
					style: "cancel"
				},
				{
					text: "Oui",
					onPress: () => {
						sendTaskToBottom();
					}
				}
			]
		);
	}

	const createTwoButtonAlert = () => {
		Alert.alert(
			"Fin du temps: " + currentTask.title,
			"Avez-vous realiser cette tache ?",
			[
				{
					text: "Non",
					onPress: () => {
						confirmBeforeSendBottom();
					},
					style: "cancel"
				},
				{
					text: "Oui",
					onPress: () => {
						console.log("Retirer la tache");
						// TODO:  mark as finished
						removeFirstTask();
					}
				}
			]
		);
	}

	const confirmBeforeSendBottom = () => {
		Alert.alert(
			"Tache suivante !",
			"Que faire de la tâche",
			[
				{
					text: "Renvoyer en bas de la liste",
					onPress: () => {
						setTimerKey(new Date());
						sendTaskToBottom();
					},
					style: "cancel"
				},
				{
					text: "Continuer la tâche",
					onPress: () => {
						showToast('Super, bonne concentration');
					}
				}
			]
		);
	}

	const confirmBeforeReturnHome = () => {
		Alert.alert(
			"Retour à l'accueil",
			"Es-tu sûre d'arrêter maintenant ?",
			[
				{
					text: "Non",
					onPress: () => {
						showToast('Superbe décision, continuons !');
					},
					style: "cancel"
				},
				{
					text: "Oui",
					onPress: () => {
						navigation.goBack();
					}
				}
			]
		);
	}


	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.header}>
				<Text style={styles.headerText}>{pomoTour} / {tasks.length}</Text>
			</View>
			<View style={styles.timer}>
				<View style={styles.actionView}>
					<TouchableOpacity
						style={styles.pauseBtn}
						onPress={() => {
							setIsPlaying(!isPlaying)
						}}
					>
						{
							isPlaying ? <AntDesign name="pause" size={30} color={Colors.SECONDARY} /> : <Feather name="play" size={25} color={Colors.WHITE} />
						}
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.nextBtn}
						onPress={() => {
							handleNextTaskBtn()
						}}
					>
						<Foundation name="next" size={30} color={Colors.WHITE} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.stopBtn}
						onPress={confirmBeforeReturnHome}
					>
						<Foundation name="home" size={30} color={Colors.GRAY} />
					</TouchableOpacity>
				</View>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={getTime()}
					key={timerKey}
					colors={[Colors.SECONDARY, Colors.DANGER]}
					colorsTime={[POMOTIME, POMOTIME / 5]}
					size={300}
					strokeWidth={30}
					onComplete={() => {
						if (tasks.length === 0) {
							return navigation.navigate('Tasks');
						}
						else {
							handleTimerEnd();
							return { shouldRepeat: true, delay: 1.5 };
						}
					}}
				>
					{({ remainingTime }) =>
						<Text style={styles.timerText}>
							{formatSecondsToTime(remainingTime)}
						</Text>
					}
				</CountdownCircleTimer>
			</View>
			<View style={styles.footer}>
				<Text style={styles.taskTitleText}>{getPomotypeText()}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GRAY,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		height: '10%',
		position: 'absolute',
		top: 35,
	},
	headerText: {
		flex: 1,
		color: Colors.PRIMARY,
		fontSize: 32,
		fontWeight: 'bold',
	},
	timer: {
		height: '70%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	timerText: {
		color: Colors.SECONDARY,
		fontSize: 45,
		fontWeight: 'bold',
	},
	footer: {
		height: '10%',
		position: 'absolute',
		bottom: 10,
	},
	taskTitleText: {
		flex: 1,
		color: Colors.PRIMARY,
		fontSize: 20,
		fontWeight: 'bold',
	},
	actionView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	pauseBtn: {
		backgroundColor: Colors.PRIMARY,
		width: 60,
		height: 60,
		borderRadius: 25,
		marginEnd: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	nextBtn: {
		backgroundColor: Colors.DANGER,
		width: 60,
		height: 60,
		borderRadius: 25,
		marginEnd: 10,
		justifyContent: 'center',
		alignItems: 'center'

	},
	stopBtn: {
		backgroundColor: Colors.SECONDARY,
		width: 60,
		height: 60,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
