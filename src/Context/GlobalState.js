import React from 'react';
import Context from './context';
export default class GlobalState extends React.Component {
    state = {
        tasks: [],
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

    lastTaskId = () => {
        if (this.state.tasks.length > 0) {
            return this.state.tasks[this.state.tasks.length - 1].id;
        }
        return 0;
    }

    render() {
        return (
            <Context.Provider
                value={{
                    tasks: this.state.tasks,
                    addNewTask: this.addNewTask,
                    deleteTask: this.deleteTask,
                    removeFirstTask: this.removeFirstTask,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}