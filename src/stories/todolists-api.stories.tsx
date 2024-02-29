import React, { useEffect, useState } from 'react'
import axios from "axios";
import {TodolistApi} from "../src/api/todolist-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        TodolistApi.getTodolists()

            .then((res) => {
            debugger
                setState(res.data)
        })
        }, [])


    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {}, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {}, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {}, [])

    return <div>{JSON.stringify(state)}</div>
}