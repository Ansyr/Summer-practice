import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Author} from "../../../shared/interfaces/author";



export const authorApi = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['Author'],
    endpoints: (build) => ({
        createAuthor: build.mutation<Author, Author>({
            query: (author) => ({
                url: '/author',
                method: "POST",
                body: author,
            }),
            invalidatesTags: ['Author']
        }),
        fetchAuthor: build.query<Author[],Author[]> ({
            query: () =>( {
                url: '/author',
            }),
            providesTags: () => ['Author']
        }),
        updateAuthor: build.mutation<Author, Author>({
            query: (author: Author) => ({
                url: `/author/update/${author.id}`,
                method: 'PATCH',
                body: JSON.stringify(author),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Author'],
        }),
    }),
})

export const {
    useCreateAuthorMutation,useFetchAuthorQuery,useUpdateAuthorMutation
} = authorApi

