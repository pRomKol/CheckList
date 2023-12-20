import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput/FullInput";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";

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
                <button variant="outlined"  onClick={removeTodoList}>X</button>
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
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}/>
                            <EditableSpan onChange={onChangeTitleHandler}
                                          title={t.title}/>
                            <button onClick={onRemoveHandler}>X
                            </button>
                        </li>

                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};
