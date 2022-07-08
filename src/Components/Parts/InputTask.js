/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InputTask({ addNewTask }) {
    const [task, setTask] = React.useState('');

    const handleAddTask = () => {
        addNewTask(task);
        setTask('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                maxLength={50}
                style={styles.input}
                placeholder="Nom de la tâche"
                placeholderTextColor={Colors.TEXT}
                onChangeText={(text) => setTask(text)}
                value={task}
                onSubmitEditing={() => { handleAddTask() }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleAddTask() }}
            >
                <MaterialCommunityIcons name="send" size={30} color={Colors.TEXT} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.GRAY,
        paddingVertical: 20,
        flexDirection: 'row',
    },
    input: {
        width: '90%',
        fontSize: 20,
        color: Colors.TEXT,
        paddingEnd: 10,
        borderBottomColor: Colors.BACKGROUND,
        borderBottomWidth: 1,
    },
    button: {
        width: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

});