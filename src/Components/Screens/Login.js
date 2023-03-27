import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../../../stylesheet";


export function LoginView({ navigation }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, signUp, signIn } = useAuth();

	useEffect(() => {
		if (user != null) {
			navigation.navigate("Links");
		}
	}, [user]);

	const onPressSignIn = async () => {
		console.log("Trying sign in with user: " + email);
		try {
			await signIn(email, password);
		} catch (error) {
			const errorMessage = `Failed to sign in: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
	};

	const onPressSignUp = async () => {
		console.log("Trying signup with user: " + email);
		try {
			await signUp(email, password);
			signIn(email, password);
		} catch (error) {
			const errorMessage = `Failed to sign up: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
	};

	return (
		<View>
			<Text>Sign Up or Sign In:</Text>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="email"
					style={styles.inputStyle}
					autoCapitalize="none"
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={(text) => setPassword(text)}
					value={password}
					placeholder="password"
					style={styles.inputStyle}
					secureTextEntry
				/>
			</View>
			<Button onPress={onPressSignIn} title="Sign In" />
			<Button onPress={onPressSignUp} title="Sign Up" />
		</View>
	);
}