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
                <MaterialCommunityIcons name="delete" size={30} color={Colors.DARK} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'baseline',
        width: '100%',
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
        fontSize: 20,
        color: Colors.DARK,
        width: '90%',
    },
});