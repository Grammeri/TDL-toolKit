import {AppRootStateType} from "app/store";

export const selectIsInitialized = (state:AppRootStateType) => state.app.isInitialized