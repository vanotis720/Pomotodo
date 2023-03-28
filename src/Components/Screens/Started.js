import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
import Colors from "../../utilities/Color";


export function StartedView({ navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden={true} />
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require('../../../assets/images/started.png')} />
			</View>
			<View style={styles.actionContainer}>
				<Text style={styles.title}>Gère tes tâches avec la méthode Pomodoro</Text>
				<Text style={styles.subtitle}>Une application de gestion des tâches pas comme les autres !</Text>
				<View style={styles.actionBtn}>
					<TouchableOpacity
						style={styles.btnRegister}
						onPress={() => navigation.navigate('Register')}
					>
						<Text style={styles.btnTxt}>Je m'inscris</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnLogin}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={styles.btnTxt}>S'identifier</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GRAY,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	imageContainer: {
		flex: 1.5,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 20,
	},
	actionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	title: {
		fontSize: 25,
		color: Colors.PRIMARY,
		fontWeight: '700',
		textAlign: 'center',
		marginVertical: 10
	},
	subtitle: {
		fontSize: 16,
		color: Colors.PRIMARY,
		fontWeight: '300',
		textAlign: 'center',
		opacity: 0.7
	},
	actionBtn: {
		flexDirection: 'row',
		marginTop: 20,
		borderColor: Colors.WHITE,
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnRegister: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	btnLogin: {
		flex: 1,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnTxt: {
		color: Colors.PRIMARY,
		fontWeight: '400'
	}
});