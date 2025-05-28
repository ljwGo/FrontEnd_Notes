// Brief
/*
你可以将 reducer 与 context 相结合，让任何组件读取和更新它的状态。
为子组件提供 state 和 dispatch 函数：
创建两个 context (一个用于 state,一个用于 dispatch 函数)。
让组件的 context 使用 reducer。
使用组件中需要读取的 context。
你可以通过将所有传递信息的代码移动到单个文件中来进一步整理组件。
你可以导出一个像 TasksProvider 可以提供 context 的组件。
你也可以导出像 useTasks 和 useTasksDispatch 这样的自定义 Hook。
你可以在你的应用程序中大量使用 context 和 reducer 的组合。
*/

// reducerProvider.js
import { createContext, useContext, useReducer, useState } from 'react';

export const stateContext = createContext(null);
export const dispatchContext = createContext(null);

export function StateProvider({ state, dispatch, children }) {
    return (
        <stateContext.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </stateContext.Provider>
    )
}

// 自定义 Hook
export function useDispatch() {
    return useContext(dispatchContext);
}

export function useParentState() {
    return useContext(stateContext);
}

// data.js
export const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false }
];

// reducer.js
import { initialTasks } from './data.js';
let nextId = initialTasks.length;

export const taskActions = {
    'added': (text) => { return {type: 'added', text: text} },
    'edited': (id, text) => { return {type: 'edited', taskId: id, text: text} },
    'changed': (id, done) => { return {type: 'changed', taskId: id, done: done} },
    'deleted': (id) => { return {type: 'deleted', taskId: id} }
}

export function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: nextId++,
                text: action.text,
                done: false
            }]
        }
        case 'edited': {
            return tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, text: action.text};
                }
                return t;
            })
        }
        case "changed": {
            return tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, done: action.done};
                }
                return t;
            })
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.taskId);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// cmp.js
import { StateProvider, useDispatch, useState } from './context.js';
import { tasksReducer, taskActions } from './reducer.js';
import { initialTasks } from './data.js';

export function TodoApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <StateProvider state={tasks} dispatch={dispatch}>
            <h1>My Todo App</h1>
            <AddTask/>
            <TaskList/>
        </StateProvider>
    )
}

// 子组件树随处使用state和dispatch
function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div>
            <input type="text" value={text} onChange={handleChange}/>
            <button onClick={() => {
                setText('');
                dispatch(taskActions.added(text));
            }}>Add</button>
        </div>
    )
}

function TaskList() {
    const tasks = useParentState();

    return (
        <ul>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task}/>
            ))}
        </ul>
    )
}

function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    return (
        <li>
            {isEditing ? 
            <>          
                <input type="text" value={text} onChange={e => {
                    setText(e.target.value);
                }}/>
                <button onClick={() => {
                    dispatch(taskActions.edited(task.id, text));
                    setIsEditing(false);
                }}>Save</button>
                <button onClick={() => {
                    setIsEditing(false);
                }}>Cancel</button>
            </> : 
            <>
                {task.text}
                <button onClick={() => {
                    setIsEditing(true);
                    setText(task.text);
                }}>Edit</button>
                <button onClick={() => {
                    dispatch(taskActions.deleted(task.id));
                }}>Delete</button>
            </>
            }
        </li>
    )
}


// app.js
import { TodoApp } from './cmp.js';

export default function App() {
    return <TodoApp/>
}
