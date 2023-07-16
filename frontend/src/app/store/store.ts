import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {fullBookInfoAPI} from "../../pages/book-info/model/api.ts";
import {userInfoApi} from "../../pages/user-info/model/api.ts";
import {bookApi} from "../../pages/create-user/model/api.ts";
import UserFormSlice from "../../pages/create-user/model/slice"
import {BookFormSlice} from "../../pages/create-book/model/slice.ts";
import {AuthorFormSlice} from "../../pages/create-author/model/slice.ts";
import {authorApi} from "../../pages/create-author/model/api.ts";

const rootReducer = combineReducers({
    [fullBookInfoAPI.reducerPath] : fullBookInfoAPI.reducer,
    [userInfoApi.reducerPath] : userInfoApi.reducer,
    [bookApi.reducerPath] : bookApi.reducer,
    userForm: UserFormSlice,
    bookForm: BookFormSlice.reducer,
    authorForm: AuthorFormSlice.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
            fullBookInfoAPI.middleware,
            userInfoApi.middleware,
            bookApi.middleware,
            authorApi.middleware,
        ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']