import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const TodolistApi = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<CreateTodolistResponseType>('todo-lists')
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists${todolistId}`)
    },
    updateTodolistTitle: (todolistId: string, title: string) => {
        return instance.post(`todo-lists${todolistId}`, {title})
    }

}
type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}
export type CreateTodolistResponseType = {
    data: {
        item: TodolistType
    }
    message: string[]
    fieldsErrors: string[]
    resultCode: number
}
export type DeleteTodolistResponseType = {
    data: {}
    message: string[]
    fieldsErrors: string[]
    resultCode: number
}
export type UpdateTodolistResponseType = {
    data: {}
    message: string[]
    fieldsErrors: string[]
    resultCode: number
}