import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput/FullInput";
import {ChangeEvent, useState} from "react";

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
    filter: FilterValuesType


}
export const TodoList = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)

    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <FullInput addTusk={props.addTask}
                       newTaskTitle={newTaskTitle}
                       setNewTaskTitle={setNewTaskTitle}
                       id={props.id}/>
            <ul>
                {
                    props.tasksForTodolist.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
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

