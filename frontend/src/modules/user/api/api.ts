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
        updateUser: build.mutation<UserApi, UserApi>({
            query: (user: UserApi) => ({
                url: `/user/update/${user.id}`,
                method: 'PATCH',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['user'],
        }),
        deleteUser: build.mutation<UserApi, UserApi>({
            query: (user: UserApi) => ({
                url: `/user/delete/${user.id}`,
                method: 'DELETE',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['user'],

        }),
    }),
})

export const {
    useCreateUserMutation,useUpdateUserMutation,useDeleteUserMutation
} = userFormApi

