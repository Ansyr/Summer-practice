
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PopularBook, PredictSale, ReadableCity} from "./type.ts";



export const statisticApi = createApi({
    reducerPath: 'statisticApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    tagTypes: ['statistic'],
    endpoints: (build) => ({

        getPopularBooks: build.query<PopularBook[], PopularBook[]>({
            query: () => ({
                url: '/statistic/popularbooks',
            }),
            providesTags: ['statistic', 'user'],
        }),

        getReadableCity: build.query<ReadableCity[],ReadableCity[]>({
            query: () => ({
                url: '/statistic/readablecity',
            }),
            providesTags: ['statistic', 'user'],
        }),

        getPredictSale: build.query<PredictSale[],PredictSale[]>({
            query: () => ({
                url: '/statistic/predictsale',
            }),
            providesTags: ['statistic', 'user'],
        }),


    }),
})

export const {
    useGetPopularBooksQuery,useGetReadableCityQuery,useGetPredictSaleQuery
} = statisticApi

