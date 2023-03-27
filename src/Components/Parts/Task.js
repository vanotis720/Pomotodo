/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Task({ task, deleteTask }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <TouchableOpacity
                onPress={() => deleteTask(task.id)}
            >
                <MaterialCommunityIcons name="close-circle-outline" size={30} color={Colors.DANGER} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.DARK,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: Colors.TEXT,
        width: '90%',
    },
});