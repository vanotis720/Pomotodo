import React from 'react';

export default React.createContext({
    tasks: [],
    firstTime: true,
    addNewTask: (task) => { },
    deleteTask: (taskId) => { },
    removeFirstTask: () => { },
    sendTaskToBottom: () => { },
    setFirstTime: () => { },
});