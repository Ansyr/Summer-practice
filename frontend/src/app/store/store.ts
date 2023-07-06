import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {fullBookInfoAPI} from "../../pages/book-info/model/api.ts";


const rootReducer = combineReducers({
    [fullBookInfoAPI.reducerPath] : fullBookInfoAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fullBookInfoAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']