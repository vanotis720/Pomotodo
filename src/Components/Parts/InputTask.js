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
                placeholderTextColor={Colors.PRIMARY}
                onChangeText={(text) => setTask(text)}
                value={task}
                onSubmitEditing={() => { handleAddTask() }}
                returnKeyType='send'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleAddTask() }}
            >
                <MaterialCommunityIcons name="plus" size={30} color={Colors.WHITE} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.DARK,
        marginTop: 20,
    },
    input: {
        height: 50,
        fontSize: 20,
        color: Colors.TEXT,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        height: 50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});