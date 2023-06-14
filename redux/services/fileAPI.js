import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const api_uri = process.env.REACT_APP_API;

export const fileAPI = createApi({
	reducerPath: "fileAPI",
	baseQuery: fetchBaseQuery({ baseUrl: api_uri }),
	tagTypes: ["File"],
	endpoints: (build) => ({
		getFile: build.mutation({
			query: ({ id }) => ({
				url: `/file`,
				method: "GET",
				params: {
					id: id,
				},
				responseHandler: async (response) =>
					window.URL.createObjectURL(await response.blob()),
				cache: "no-cache",
			}),
			providesTags: (result) => ["File"],
		}),
	}),
});
