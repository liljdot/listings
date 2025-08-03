import type { ListingForList } from "@/features/listing/types"
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios"
import type { DateRange } from "react-day-picker"

const typedApi = api as AxiosInstance

interface CustomBaseQueryArgs {
    id?: ListingForList["id"]
    filters?: {
        search: string;
        guests: number;
        dates?: DateRange;
    }
}

const customBaseQuery: BaseQueryFn<CustomBaseQueryArgs, unknown, unknown> = ({ id, filters }) => {
    if (!id) {
        return typedApi.get<ListingForList[]>(`/api/listings`, {
            params: filters
        })
    }

    return typedApi.get<ListingForList>(`/api/listings/${id}`)
}

export const listingsApi = createApi({
    reducerPath: "api/listingsApi",
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        getSingleListing: builder.query<ListingForList, ListingForList["id"]>({
            query: id => ({ id })
        }),
        getListings: builder.query<ListingForList[], CustomBaseQueryArgs["filters"]>({
            query: filters => ({ filters })
        })
    })
})

export const { useGetSingleListingQuery, useGetListingsQuery } = listingsApi