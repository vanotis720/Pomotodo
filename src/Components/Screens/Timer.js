/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { formatSecondsToTime } from '../../helpers/cast';
import Colors from '../../utilities/Color';
import Context from '../../Context/context';

const POMOTIME = 25 * 60;
const BREAKTIME = 5 * 60;
const LONGBREAKTIME = 15 * 60;

export default function Timer({ navigation }) {

	const { tasks, removeFirstTask } = React.useContext(Context);
	const [currentTask, setCurrentTask] = React.useState('');
	const [pomotype, setPomotype] = React.useState('WORK');
	const [pomonumber, setPomonumber] = React.useState(1);

	useEffect(() => {
		if (tasks.length > 0) {
			setCurrentTask(tasks[0]);
		}
	}
		, [tasks]);

	// handle timer end
	const handleTimerEnd = () => {
		if (pomotype === 'WORK') {
			removeFirstTask();
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

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.header}>
				<Text style={styles.headerText}>{pomonumber} / 3</Text>
			</View>
			<View style={styles.timer}>
				<CountdownCircleTimer
					isPlaying
					duration={getTime()}
					colors={['#8D99AE', '#D90429']}
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
		backgroundColor: Colors.DARK,
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
		color: Colors.SECONDARY,
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
		color: Colors.SECONDARY,
		fontSize: 32,
		fontWeight: 'bold',
	},
});
