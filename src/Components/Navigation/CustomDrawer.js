import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../utilities/Color';
import Constants from "expo-constants"


const CustomDrawer = ({ navigation }) => {

    const { signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/images/logo-icon.png')} style={styles.logo} />
                <Text style={styles.headerText} onPress={() => navigation.navigate('Tasks')}>
                    PomoTodo
                </Text>
                <Text style={styles.versionText}>
                    {'v' + Constants.manifest.version}
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItem}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
                        <Text style={styles.bodyItemText}>
                            Mes taches
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={styles.bodyItemText} onPress={() => { Linking.openURL('https://vanotis720.github.io/pomotodo-landing/') }}>
                        À propos
                    </Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={styles.bodyItemText} onPress={() => { Linking.openURL('https://www.privacypolicies.com/live/09d9e3cb-87e3-4fac-a91a-5ae263943a54') }}>
                        Politique de confidentialité
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Copyright © 2023 Vander Otis. All rights reserved.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerText: {
        color: Colors.PRIMARY,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    },
    versionText: {
        color: Colors.PRIMARY,
        fontSize: 15,
        marginTop: 10,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    body: {
        flex: 5,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    footerText: {
        color: Colors.PRIMARY,
        fontSize: 15,
        textAlign: 'center',
    },
    bodyItem: {
        height: 60,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: Colors.GRAY,
        borderBottomColor: Colors.WHITE,
        borderBottomWidth: 1,
    },
    bodyItemText: {
        color: Colors.TEXT,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default CustomDrawer;