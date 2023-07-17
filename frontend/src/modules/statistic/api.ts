import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PopularBook, ReadableCity} from "./type.ts";



export const statisticApi = createApi({
    reducerPath: 'statisticApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['statistic'],
    endpoints: (build) => ({

        getPopularBooks: build.query<PopularBook[], PopularBook[]>({
            query: () => ({
                url: '/statistic/popularbooks',
            }),
            providesTags: () => ['statistic']
        }),

        getReadableCity: build.query<ReadableCity[],ReadableCity[]>({
            query: () => ({
                url: '/statistic/readablecity',
            }),
            providesTags: () => ['statistic']
        }),


    }),
})

export const {
   useGetPopularBooksQuery,useGetReadableCityQuery
} = statisticApi

