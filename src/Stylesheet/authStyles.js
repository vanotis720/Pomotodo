import { StyleSheet } from "react-native";
import Colors from "../utilities/Color";

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY,
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 20
    },
    title: {
        color: Colors.PRIMARY,
        fontSize: 25,
        fontWeight: '700',
        alignSelf: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: Colors.PRIMARY,
        fontSize: 18,
        fontWeight: '100',
        marginBottom: 20,
        alignSelf: 'center',
        textAlign: 'center'
    },
    inputContainer: {
        marginBottom: 10
    },
    inputStyle: {
        width: '100%',
        backgroundColor: Colors.WHITE,
        height: 50,
        paddingStart: 15,
        borderRadius: 10
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 5,
    },
    signinBtn: {
        backgroundColor: Colors.SECONDARY,
        height: 50,
        borderRadius: 10,
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinBtnTxt: {
        color: Colors.GRAY,
        fontSize: 15
    },
    signupAction: {
        alignItems: 'center'
    },
    signupLink: {
        alignSelf: 'center'
    },
    signupLinkText: {
        color: '#0645AD'
    },
    signUpBtn: {
        backgroundColor: Colors.PRIMARY,
        height: 50,
        borderRadius: 10,
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default authStyles;