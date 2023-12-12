import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        const tasks = await AsyncStorage.getItem('tasks');
        if (tasks) {
            setTasks(JSON.parse(tasks));
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const saveTasks = async () => {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const addNewTask = (task) => {
        if (task.length > 0) {
            id = lastTaskId() + 1;
            setTasks([...tasks, { title: task, id: id }]);
        }
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const removeFirstTask = () => {
        if (tasks.length > 0) {
            let newTasks = tasks;
            setTasks(newTasks.slice(1));
        }
    }

    const sendTaskToBottom = () => {
        if (tasks.length > 1) {
            const firstTask = tasks[0];
            setTasks(oldTasks => [...oldTasks.slice(1), firstTask]);
        }
    }

    const lastTaskId = () => {
        if (tasks.length > 0) {
            return tasks[tasks.length - 1].id;
        }
        return 0;
    }


    return (
        <GlobalContext.Provider
            value={{
                tasks,
                saveTasks,
                sendTaskToBottom,
                removeFirstTask,
                deleteTask,
                addNewTask
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}