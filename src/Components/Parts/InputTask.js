import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Colors from '../../utilities/Color';

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
                blurOnSubmit={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 17,
        borderRadius: 15,
        color: Colors.TEXT,
        paddingHorizontal: 15,
        backgroundColor: Colors.GRAY
    },
});