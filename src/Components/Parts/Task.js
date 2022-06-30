/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Task({ navigation, task }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <TouchableOpacity onPress={() => { alert('deleted') }}>
                <MaterialCommunityIcons name="delete" size={30} color={Colors.RED} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 58,
        flexDirection: 'row',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        color: Colors.DARK,
    },
});