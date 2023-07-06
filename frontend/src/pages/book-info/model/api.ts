import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {FullBookInfo} from "./type.ts";


export const fullBookInfoAPI = createApi({
    reducerPath:'fullBookInfoAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000/api/v1'}),
    tagTypes: ['fullbook'],
    endpoints: (build) => ({
        fetchFullBook: build.query<FullBookInfo[],FullBookInfo[]>({
            query: () => ({
                url: '/fullbook',
            }),
            providesTags: () => ['fullbook']
        }),
    deleteFullBook: build.mutation<FullBookInfo,string>({
        query: (id ) => ({
            url:`/fullbook/${id}/`,
            method: "DELETE",
            body: id,
        }),
        invalidatesTags:['fullbook']
    }),
        updateFullBook: build.mutation<FullBookInfo,string>({
            query: (id ) => ({
                url:`/fullbook/${id}/`,
                method: "PUT",
                body: id,
            }),
            invalidatesTags:['fullbook']
        }),

    }),
})

export const {useFetchFullBookQuery,useDeleteFullBookMutation,useUpdateFullBookMutation} = fullBookInfoAPI

