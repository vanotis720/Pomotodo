import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import authStyles from "../../Stylesheet/authStyles";


export function RegisterView({ navigation }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signUp, signIn } = useAuth();

	const onPressSignUp = async () => {
		console.log("Trying signup with user: " + email);
		try {
			await signUp(email, password);
			signIn(email, password);
		} catch (error) {
			const errorMessage = `Échec de l'inscription: ${error.message}`;
			// console.error(errorMessage);
			Alert.alert(errorMessage);
		}
	};

	return (
		<View style={authStyles.container}>
			<Text style={authStyles.title}>Bienvenu(e)</Text>
			<Text style={authStyles.subtitle}>Nous sommes heureux de te compter parmi nous !</Text>
			<KeyboardAvoidingView>
				<View style={authStyles.inputContainer}>
					<TextInput
						onChangeText={setEmail}
						value={email}
						placeholder="Adresse email"
						style={authStyles.inputStyle}
						autoCapitalize="none"
					/>
				</View>
				<View style={authStyles.inputContainer}>
					<TextInput
						onChangeText={(text) => setPassword(text)}
						value={password}
						placeholder="Mot de passe"
						style={authStyles.inputStyle}
						secureTextEntry
					/>
				</View>
			</KeyboardAvoidingView>
			<TouchableOpacity
				style={authStyles.signUpBtn}
				onPress={onPressSignUp}
			>
				<Text style={authStyles.signinBtnTxt}>Je m'inscris</Text>
			</TouchableOpacity>

			<View style={authStyles.signupAction}>
				<Text style={authStyles.signupLink}>
				Déjà membre ?
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={authStyles.signupLinkText}>Identifie-toi</Text>
				</TouchableOpacity>
			</View>

		</View>
	);
}