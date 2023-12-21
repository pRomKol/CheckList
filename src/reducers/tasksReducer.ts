
import {TasksStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: TasksReducerType) => {
    switch (action.type) {
        case"REMOVE-TASK":{
            return  {...state, [action.payload.todoListId]:
                    state[action.payload.todoListId].filter(
                        task => task.id !== action.payload.id)  }
        }
        case"ADD-TASK":{
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return state
        }
        default:
            return state
    }
}

type TasksReducerType = RemoveTaskACType | AddTaskACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload:{
            todoListId,
            id
        }
    } as const
}
export const addTaskAC = (title:string, id:string, todoListId:string) => {
    return{
        type: 'ADD-TASK',
        payload:{
            title,
            id,
            todoListId
        }
    } as const
}