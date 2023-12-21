import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput/FullInput";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type TodolistPropsType = {
    id: string
    title: string
    tasksForTodolist: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (newTodolistTitle: string, todoListId: string) => void


}
export const TodoList = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)

    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodolistTitle = (newTodoListTitle: string) => {
        props.changeTodoListTitle(newTodoListTitle, props.id)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>

            <FullInput addItem={addTask}/>
            <ul>
                {
                    props.tasksForTodolist.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={t.id}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}/>

                            <EditableSpan onChange={onChangeTitleHandler}
                                          title={t.title}/>
                            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </li>

                    })
                }

            </ul>
            <div>
                <Button variant={props.filter === 'all'? "contained": 'outlined'} color="success" onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant={props.filter === 'active'? "contained": 'outlined'} color="error" onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed'? "contained": 'outlined'} onClick={onCompletedClickHandler}>
                    Completed
                </Button>
                {/*<button className={props.filter === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>All*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'active' ? 'active-filter' : ""}*/}
                {/*        onClick={onActiveClickHandler}>Active*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'completed' ? 'active-filter' : ""}*/}
                {/*        onClick={onCompletedClickHandler}>Completed*/}
                {/*</button>*/}
            </div>
        </div>
    );
};
