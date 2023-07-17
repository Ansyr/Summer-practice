import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Book, BookWithPrice} from "./type.ts";



export const bookFormApi = createApi({
    reducerPath: 'bookFormApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['book'],
    endpoints: (build) => ({
        createBook: build.mutation<BookWithPrice,BookWithPrice> ({
            query: (book) => ({
                url: '/book',
                method:"POST",
                body: book,
            }),
            invalidatesTags: ['book']
        }),
        fetchBookApi: build.query<BookWithPrice[], BookWithPrice[]>({
            query: () => ({
                url: '/book',
            }),
            providesTags: () => ['book']
        }),
        updateBook: build.mutation<BookWithPrice, BookWithPrice>({
            query: (book: BookWithPrice) => ({
                url: `/book/update/${book.id}`,
                method: 'PATCH',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['book'],
        }),
        deleteBook: build.mutation<BookWithPrice, BookWithPrice>({
            query: (book: BookWithPrice) => ({
                url: `/book/delete/${book.id}`,
                method: 'DELETE',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['book'],

        }),
        getAllBooks: build.query<Book[], Book[]>({
            query: () => ({
                url: '/book/allbook',
            }),
            providesTags: () => ['book']
        }),

        getPopularBooks: build.query<Book[], Book[]>({
            query: () => ({
                url: '/book/allbook',
            }),
            providesTags: () => ['book']
        }),
    }),
})

export const {
    useCreateBookMutation,useDeleteBookMutation,useUpdateBookMutation,useFetchBookApiQuery, useGetAllBooksQuery
} = bookFormApi

