import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const api_uri = process.env.REACT_APP_API;

export const cardsAPI = createApi({
    reducerPath: 'cardsAPI',
    baseQuery: fetchBaseQuery({baseUrl: api_uri}),
    tagTypes: ['Cards'],
    endpoints: (build) => ({
        fetchAllCards: build.query({
            query: ({limit = 10, orderBy = '0', skip = 0} ) => ({
                url: `/cards`,
                params: {
                    skip: skip,
                    limit: limit,
                    order_by: orderBy
                }
            }),
            providesTags: result => ['Cards'],
            transformResponse: (response, meta, arg) => response.cards
        }),
        fetchCard: build.query({
            query: ({id = 0} ) => ({
                url: `/cards/${id}`,
            }),
            providesTags: result => ['Cards']
        }),
        editCard: build.mutation({
            query: ({body, id}) => ({
                url: `/cards/${id}`,
                method: 'PATCH',
                body
            }),
            providesTags: result => ['Cards']
        }),

    })
})

