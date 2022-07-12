import React from 'react';
import Context from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class GlobalState extends React.Component {

    state = {
        tasks: [],
        firstTime: true,
    }

    // get tasks from AsyncStorage
    async componentDidMount() {
        const tasks = await AsyncStorage.getItem('tasks');
        const firstTime = await AsyncStorage.getItem('firstTime');

        if (tasks) {
            this.setState({ tasks: JSON.parse(tasks) });
        }
        if (firstTime) {
            this.setState({ firstTime: JSON.parse(firstTime) });
            console.log('getting');
            console.log(JSON.parse(firstTime));
            console.log(this.state.firstTime);
        }
        console.log("storage get");
    }

    addNewTask = (task) => {
        console.log('addNewTask', task);
        if (task.length > 0) {
            id = this.lastTaskId() + 1;
            this.setState({ tasks: [...this.state.tasks, { title: task, id: id }] });
        }
    };

    deleteTask = (taskId) => {
        console.log('deleteTask', taskId);
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId) });
    };

    // remove first task on the tasks list
    removeFirstTask = () => {
        console.log('removeFirstTask');
        this.setState({ tasks: this.state.tasks.slice(1) });
    }

    // send first task to the bottom of the tasks list
    sendTaskToBottom = () => {
        console.log('sendTaskToBottom');
        const firstTask = this.state.tasks[0];
        this.setState({ tasks: [...this.state.tasks.slice(1), firstTask] });
    }

    lastTaskId = () => {
        if (this.state.tasks.length > 0) {
            return this.state.tasks[this.state.tasks.length - 1].id;
        }
        return 0;
    }

    // set firstTime to false when user finish onboarding
    setFirstTime = () => {
        console.log('setFirstTime to false');
        this.setState({ firstTime: false });
        AsyncStorage.setItem('firstTime', JSON.stringify(false));
    }

    render() {
        return (
            <Context.Provider
                value={{
                    tasks: this.state.tasks,
                    firstTime: this.state.firstTime,
                    addNewTask: this.addNewTask,
                    deleteTask: this.deleteTask,
                    removeFirstTask: this.removeFirstTask,
                    sendTaskToBottom: this.sendTaskToBottom,
                    setFirstTime: this.setFirstTime,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}