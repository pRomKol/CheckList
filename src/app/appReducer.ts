type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
switch (action.type){
    case 'APP/SET-STATUS':
        return {
            ...state, status: action.status
        }
    default:
        return state
}
}


export const setAppStatusAC = (status: RequestStatusType)=>  ({type: 'APP/SET-STATUS', status } as const)

type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type ActionType = SetAppStatusType