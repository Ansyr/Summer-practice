import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userInfoApi} from "../../pages/user-info/model/api.ts"
import {userFormApi} from "../../modules/user/api/api.ts";
import {authorApi} from "../../modules/author/api/api.ts";
import {bookFormApi} from "../../modules/book/api/api.ts";
import {statisticApi} from "../../modules/statistic/api.ts";

const rootReducer = combineReducers({
    [userInfoApi.reducerPath] : userInfoApi.reducer,
    [userFormApi.reducerPath] : userFormApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [bookFormApi.reducerPath]: bookFormApi.reducer,
    [statisticApi.reducerPath] : statisticApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
            userInfoApi.middleware,
            userFormApi.middleware,
            authorApi.middleware,
            bookFormApi.middleware,
            statisticApi.middleware
        ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']