import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';
import { AddTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const {payload} = action
            const {taskId, todolistId} = payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(t => t.id !== taskId)
            }
        }
        case 'ADD-TASK':
            const {payload} = action
            const {title, todolistId} = payload
            return {
                ...state,
                [todolistId]: [{id: v1(), title: title, isDone: false}, ...state[todolistId]]
            }
        case "CHANGE-TASK-STATUS": {
            const {payload} = action
            const {taskId, todolistId, isDone} = payload
            return {
                ...state,
                [todolistId]: state[todolistId]
                    .map(t => t.id === taskId ? {...t, isDone: isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            const {payload} = action
            const {taskId, todolistId, title} = payload
            return {
                ...state,
                [todolistId]: state[todolistId]
                    .map(t => t.id === taskId ? {...t, title: title} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, todolistId, isDone}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, todolistId, title}} as const
}
