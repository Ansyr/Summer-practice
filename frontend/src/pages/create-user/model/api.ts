import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Book} from "./type.ts";


export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['allbook'],
    endpoints: (build) => ({
        getAllBooks: build.query<Book[], Book[]>({
            query: () => ({
                url: '/book/allbook',
            }),
            providesTags: () => ['allbook']
        }),
        createBook: build.mutation<Book,Book> ({
            query: () => ({
                url: '/book'
            })
        })
    }),
})

export const {
    useGetAllBooksQuery
} = bookApi

