import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {ButtonAppBar} from "./AppBar";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import {FullInput} from "./Components/FullInput/FullInput";
import {removeTaskAC, tasksReducer} from "./reducers/tasksReducer";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let task = tasksObj[todolistId]
        tasksObj[todolistId] = [newTask, ...task]
        setTasksObj({...tasksObj})
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoList([...todoLists]);
        }
    }
    const changeTodoListTitle = (newTodoListTitle: string, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.title = newTodoListTitle;
            setTodoList([...todoLists]);
        }
    }

    const removeTask = (id: string, todolistId: string) => {
       dispatchTasksObj(removeTaskAC(id, todolistId))
    }


    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todoLists, setTodoList] = useState<Array<TodolistPropsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to do', filter: 'all'}
    ])
    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }
    const addTodoList = (title: string) => {
        let newTodolist: TodolistPropsType = {id: v1(), title: title, filter: 'all'}
        setTodoList([...todoLists, newTodolist])
        setTasksObj({
            ...tasksObj,
            [newTodolist.id]: []
        })
    }
    let [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'Html CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Souse', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ]
    })
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: '10px'}}>
                    <FullInput addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={5}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(tasks => tasks.isDone);
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(tasks => !tasks.isDone);
                            }
                            return <Grid item justifyContent={'space-around'}>
                                <Paper elevation={5} style={{padding: '20px'}}>
                                    <TodoList
                                        removeTodoList={removeTodoList}
                                        key={tl.id}
                                        id={tl.id}
                                        changeFilter={changeFilter}
                                        title={tl.title}
                                        tasksForTodolist={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}/>
                                </Paper>
                            </Grid>
                        })

                    }
                </Grid>
            </Container>

        </div>
    );
}


export default App;