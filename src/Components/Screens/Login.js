import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import authStyles from "../../Stylesheet/authStyles";
import { ActivityIndicator } from "react-native";
import Colors from "../../utilities/Color";


export function LoginView({ navigation }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signIn } = useAuth();

	const onPressSignIn = async () => {
		setIsLoading(true);
		console.log("Trying sign in with user: " + email);
		try {
			await signIn(email, password);
		} catch (error) {
			const errorMessage = `Échec de la connexion: ${error.message}`;
			// console.error(errorMessage);
			Alert.alert(errorMessage);
		}
		setIsLoading(false);
	};

	return (
		<View style={authStyles.container}>
			<Text style={authStyles.title}>Rebonjour</Text>
			<Text style={authStyles.subtitle}>Bienvenue, tu nous as manqué !</Text>
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
			<TouchableOpacity>
				<Text style={authStyles.forgotPassword}>Mot de passe oublié ?</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={authStyles.signinBtn}
				onPress={onPressSignIn}
			>
				{
					isLoading ? <ActivityIndicator color={Colors.WHITE} /> : <Text style={authStyles.signinBtnTxt}>S'identifier</Text>
				}
			</TouchableOpacity>

			<View style={authStyles.signupAction}>
				<Text style={authStyles.signupLink}>
					Tu n'es pas enregistré ?
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}>
					<Text style={authStyles.signupLinkText}>Inscris-toi</Text>
				</TouchableOpacity>
			</View>

		</View>
	);
}
