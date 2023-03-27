import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
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
	const [pomonumber, setPomonumber] = React.useState(1);
	const [isPlaying, setIsPlaying] = React.useState(true);

	useEffect(() => {
		if (tasks.length > 0) {
			setCurrentTask(tasks[0]);
		}
		return () => {
			console.log("storage update");
			AsyncStorage.setItem('tasks', JSON.stringify(tasks));

		}
	}
		, [tasks]);


	// handle timer end
	const handleTimerEnd = () => {
		if (pomotype === 'WORK') {
			(pomotype == 'WORK') ? createTwoButtonAlert() : null;
			setPomonumber(pomonumber + 1);

			if (pomonumber === 3) {
				console.log('long break');
				setPomonumber(0);
				setPomotype('LONGBREAK');
			}
			else {
				setPomotype('BREAK');
			}
		}
		else if (pomotype !== 'WORK') {
			setPomotype('WORK');
		}
	}

	const handleNextTaskBtn = () => {
		createTwoButtonAlert();
		// TODO: add some logic
	}

	// return time based on pomotype
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

	// return pomotype text
	const getPomotypeText = () => {
		if (pomotype === 'WORK') {
			return currentTask.title;
		}
		else if (pomotype === 'BREAK') {
			return 'Temps de pause';
		}
		else if (pomotype === 'LONGBREAK') {
			return 'Pause longue';
		}
	}

	const createTwoButtonAlert = () => {
		Alert.alert(
			"Fin du temps: " + currentTask.title,
			"Avez-vous realiser cette tache ?",
			[
				{
					text: "Non",
					onPress: () => {
						console.log("Renvoyer en bas de la liste");
						sendTaskToBottom();
					},
					style: "cancel"
				},
				{
					text: "Oui",
					onPress: () => {
						console.log("Retirer la tache");
						removeFirstTask();
					}
				}
			]
		);
	}


	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.header}>
				<Text style={styles.headerText}>{pomonumber} / {tasks.length}</Text>
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
							isPlaying ? <AntDesign name="pause" size={30} color={Colors.SECONDARY} /> : <Feather name="play" size={25} color={Colors.SECONDARY} />
						}
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.nextBtn}
						onPress={() => {
							handleNextTaskBtn()
						}}
					>
						<Foundation name="next" size={30} color={Colors.PRIMARY} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.stopBtn}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<AntDesign name="home" size={30} color={Colors.GRAY} />
					</TouchableOpacity>
				</View>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={getTime()}
					colors={[Colors.SECONDARY, Colors.DANGER]}
					colorsTime={[POMOTIME, POMOTIME / 5]}
					size={300}
					strokeWidth={30}
					onComplete={() => {
						// continue or return to home if no more tasks
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
		backgroundColor: Colors.SECONDARY,
		width: 60,
		height: 60,
		borderRadius: 25,
		marginEnd: 10,
		justifyContent: 'center',
		alignItems: 'center'

	},
	stopBtn: {
		backgroundColor: Colors.DANGER,
		width: 60,
		height: 60,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
