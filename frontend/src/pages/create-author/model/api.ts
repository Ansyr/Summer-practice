import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Author} from "./type";


export const authorApi = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['author'],
    endpoints: (build) => ({
        createAuthor: build.mutation<Author, Author>({
            query: (fullBook) => ({
                url: '/author',
                method: "POST",
                body: fullBook,
            }),
            invalidatesTags: ['author']
        }),
    }),
})

export const {
    useCreateAuthorMutation
} = authorApi

