import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
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

    const removeTask = (id: string, todolistId: string) => {
        let tasksArr = tasksObj[todolistId]
        tasksObj[todolistId] = tasksArr.filter(task => task.id !== id)
        setTasksObj({...tasksObj} )
    }


    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()


    let [todoLists, setTodoList] = useState<Array<TodolistPropsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to do', filter: 'all'},
        {id: todolistId3, title: 'What to eat', filter: 'all'},
    ])
    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }
    let [tasksObj, setTasksObj] = useState({
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
        ],
        [todolistId3]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Souse', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ]
    })
    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(tasks => tasks.isDone);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(tasks => !tasks.isDone);
                    }
                    return <TodoList
                        removeTodoList={removeTodoList}
                        key={tl.id}
                        id={tl.id}
                        changeFilter={changeFilter}
                        title={tl.title}
                        tasksForTodolist={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}/>
                })

            }

        </div>
    );
}


export default App;