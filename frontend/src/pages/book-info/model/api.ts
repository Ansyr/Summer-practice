import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {FullBookInfo} from "./type.ts";


export const fullBookInfoAPI = createApi({
    reducerPath: 'fullBookInfoAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000/api/v1'}),
    tagTypes: ['fullbook'],
    endpoints: (build) => ({
        fetchFullBook: build.query<FullBookInfo[], FullBookInfo[]>({
            query: () => ({
                url: '/fullbook',
            }),
            providesTags: () => ['fullbook']
        }),
        deleteFullBook: build.mutation<FullBookInfo, string>({
            query: (id) => ({
                url: `/fullbook/${id}/`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ['fullbook']
        }),
        createFullBook: build.mutation<FullBookInfo, FullBookInfo>({
            query: (fullBook) => ({
                url: '/fullbook',
                method: "POST",
                body: fullBook,
            }),
            invalidatesTags: ['fullbook']
        }),
        updateFullBook: build.mutation<FullBookInfo, FullBookInfo>({
            query: (fullBookInfo: FullBookInfo) => ({
                url: `/fullbook/${fullBookInfo.id}/`,
                method: "PUT",
                body: fullBookInfo,
            }),
            invalidatesTags: ['fullbook']
        }),

    }),
})

export const {
    useFetchFullBookQuery,
    useDeleteFullBookMutation,
    useUpdateFullBookMutation,
    useCreateFullBookMutation
} = fullBookInfoAPI

