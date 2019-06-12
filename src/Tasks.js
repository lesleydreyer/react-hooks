import React, { useState, useEffect, useReducer } from 'react';
import uuid from 'uuid/v4';

const initialTasksState = {
    tasks: [],
    completeTasks: []
};

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
};

const tasksReducer = (state, action) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
        case TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case TYPES.COMPLETE_TASK:
            const { completedTask } = action;
            return {
                ...state,
                completedTasks: [...state.completedTasks, completedTask],
                tasks: state.tasks.filter(t => t.id !== completedTask.id)
            }
        case TYPES.DELETE_TASK:
            return {
                ...state,
                completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
            }
        default:
            return state;
    }
}

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';
const storeTasks = (taskMap) => { //could do instead of taskMap ({ tasks, completedTasks})
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(taskMap) //could do instead of taskMap ({ tasks, completedTasks })
    );
}

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : initialTasksState;
}

function Tasks() {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();

    const [state, dispatch] = useReducer(tasksReducer, storedTasks);
    const { tasks, completedTasks } = state;

    useEffect(() => {
        storeTasks({ tasks, completedTasks });
    });

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
    }

    //return a () function reference to avoid an infinite loop since you set twice
    const completeTask = completedTask => () => {
        dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
    }

    const deleteTask = task => () => {
        dispatch({ type: TYPES.DELETE_TASK, task });
    }

    console.log('tasks', tasks);
    console.log('completed', completedTasks)

    return (
        <div>
            <h3>Tasks</h3>
            <div className='form'>
                <input value={taskText} onChange={updateTaskText} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className='task-list'>
                {
                    tasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id} onClick={completeTask(task)}>
                                {taskText}
                            </div>)
                    })
                }
            </div>
            <div className='completed-list'>
                {
                    completedTasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id}>
                                {taskText}{'  '}
                                <span onClick={deleteTask(task)} className='delete-task'>x</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Tasks;

/*CODE BEFORE ADDING USEREDUCER
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';
const storeTasks = (taskMap) => { //could do instead of taskMap ({ tasks, completedTasks})
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(taskMap) //could do instead of taskMap ({ tasks, completedTasks })
    );
}

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : { tasks: [], completedTasks: [] };//return empty arrays if tasksmap is empty
}

function Tasks() {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);//([]);
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);//([]);
    //split into separate useState cuz update to hooks has changed - previously changing one piece of state would leave the rest as is but now it replaces the entire piece of state with one setter function so if you keep separate it only updates that one and is easier for refactoring


    useEffect(() => {
        storeTasks({ tasks, completedTasks });
    });

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuid() }]);
    }

    //return a () function reference to avoid an infinite loop since you set twice
    const completeTask = completedTask => () => {
        setCompletedTasks([...completedTasks, completedTask]);
        setTasks(tasks.filter(task => task.id !== completedTask.id));
    }

    const deleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
    }

    console.log('tasks', tasks);
    console.log('completed', completedTasks)

    return (
        <div>
            <h3>Tasks</h3>
            <div className='form'>
                <input value={taskText} onChange={updateTaskText} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className='task-list'>
                {
                    tasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id} onClick={completeTask(task)}>
                                {taskText}
                            </div>)
                    })
                }
            </div>
            <div className='completed-list'>
                {
                    completedTasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id}>
                                {taskText}{'  '}
                                <span onClick={deleteTask(task)} className='delete-task'>x</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tasks;
*/