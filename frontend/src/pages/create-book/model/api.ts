import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BookWithPrice} from "./type.ts";


export const bookFormApi = createApi({
    reducerPath: 'bookApi',
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
        })
    }),
})

export const {
    useCreateBookMutation
} = bookFormApi

