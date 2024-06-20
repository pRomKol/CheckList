import { AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todoActions } from "features/TodolistsList/todolists-reducer"
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api"
import { createAppAsyncThunk } from "utils/create-app-async-thunk"

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{
        taskId: string
        todolistId: string
      }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(todoActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todoActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todoActions.setTodolists, (state, action) => {
        action.payload.todolis.forEach((tl) => {
          state[tl.id] = []
        })
      })
  },
})

// thunks

export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[]
    todolistId: string
  },
  string,
  {
    rejectValue: unknown
  }
>(`${slice.name}/fetchTasks`, async (todolistId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(appActions.setAppStatus({ status: "succeeded" }))
    return { tasks, todolistId }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
const addTask = createAppAsyncThunk<
  {
    task: TaskType
  },
  {
    title: string
    todolistId: string
  }
>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.createTask(arg)
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { task }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
const updateTask = createAppAsyncThunk<
  any,
  {
    taskId: string
    domainModel: UpdateDomainTaskModelType
    todolistId: string
  }
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  try {
    const state = getState()
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state")
      return rejectWithValue(null)
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    }
    const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === 0) {
      return arg
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = tasksActions.removeTask({ taskId, todolistId })
      dispatch(action)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask }
