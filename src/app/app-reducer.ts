import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {authActions} from 'features/auth/auth.reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type AppInitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppError: (state, action: PayloadAction<{error:string | null}>)=>{
            //return {...state, error: action.error}
            state.error = action.payload.error
        },
        setAppStatus:(state, action:PayloadAction<{status:RequestStatusType}>) =>{
            //return {...state, status: action.status}
            state.status = action.payload.status
        },
        setAppInitialized: (state, action:PayloadAction<{isInitialized:boolean}>) =>{
            //return {...state, isInitialized: action.value}
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

/*export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}*/




/*const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)*/

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
        } else {

        }

        dispatch(appActions.setAppInitialized({isInitialized:true}));
    })
}

/*export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>*/



