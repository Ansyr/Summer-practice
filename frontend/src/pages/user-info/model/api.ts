import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "./type.ts";


export const userInfoApi = createApi({
    reducerPath: "userInfoApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4000/"}),
    tagTypes: ["user"],
    endpoints: (build) => ({
        fetchUserInfo: build.query<User[], User[]>({
            query: () => ({
                url: "/user",
            }),
            providesTags: () => ["user"],
        })
    }),
})

export const {useFetchUserInfoQuery} = userInfoApi