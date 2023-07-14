import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {FullBookInfo, Book} from "./type.ts";


export const fullBookInfoAPI = createApi({
    reducerPath: 'fullBookInfoAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['book'],
    endpoints: (build) => ({
        fetchFullBook: build.query<FullBookInfo[], FullBookInfo[]>({
            query: () => ({
                url: '/book',
            }),
            providesTags: () => ['book']
        }),

        deleteFullBook: build.mutation<FullBookInfo, string>({
            query: (id) => ({
                url: `/book/${id}/`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ['book']
        }),
        createFullBook: build.mutation<FullBookInfo, FullBookInfo>({
            query: (fullBook) => ({
                url: '/book',
                method: "PATCH",
                body: fullBook,
            }),
            invalidatesTags: ['book']
        }),
        updateFullBook: build.mutation<FullBookInfo, FullBookInfo>({
            query: (fullBookInfo: FullBookInfo) => ({
                url: `/book/${fullBookInfo.id}/`,
                method: "PUT",
                body: fullBookInfo,
            }),
            invalidatesTags: ['book']
        }),

    }),
})

export const {
    useFetchFullBookQuery,
    useDeleteFullBookMutation,
    useUpdateFullBookMutation,
    useCreateFullBookMutation ,
} = fullBookInfoAPI

