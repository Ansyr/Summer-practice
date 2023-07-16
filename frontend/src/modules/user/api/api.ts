import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserApi} from "./type.ts";


export const userFormApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['user'],
    endpoints: (build) => ({

        createUser: build.mutation<UserApi,UserApi> ({
            query: (user: UserApi) => ({
                url: '/user/create',
                method:"POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['user']
        }),
    }),
})

export const {
    useCreateUserMutation
} = userFormApi

