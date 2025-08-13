import type { ListingForList } from "@/features/listing/types"
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosError, AxiosInstance } from "axios"
import type { DateRange } from "react-day-picker"
import type { CreateListingFormSchemaType } from "@/features/listing/components/CreateListingForm"

const typedApi = api as AxiosInstance

interface CustomBaseQueryArgs {
    id?: ListingForList["id"]
    filters?: {
        search: string;
        guests: number;
        dates?: DateRange;
    }
}

const customBaseQuery: BaseQueryFn<CustomBaseQueryArgs | CreateListingFormSchemaType, unknown, unknown> = (data) => {
    if ("name" in data) {
        return typedApi.post<ListingForList>("/api/listings", data)
            .catch((err: AxiosError<{ message: string }>) => {
                return { error: err.message, status: err.status }
            })
    } // name property is unique in create form schema so will default to creating the listing if true

    const { id, filters } = data // else has type of custom base query args and is ready to get listing

    if (!id) {
        return typedApi.get<ListingForList[]>(`/api/listings`, {
            params: filters
        })
    } // if no id is posted, will get all listings

    return typedApi.get<ListingForList>(`/api/listings/${id}`)

    // these work because the axios response coincidentally matches the shape custom base query is expectected to return {data:... error:... status:...}
    // ideally we would have to use .then and .catch to return the expected shape like .then(res => ({data: res.data})).catch(err => ({error: err.message, status: err.status}))
}

export const listingsApi = createApi({
    reducerPath: "api/listingsApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Listings"], // defines tags for each cache iteme. which can then be used for invalidation
    endpoints: builder => ({
        getSingleListing: builder.query<ListingForList, ListingForList["id"]>({
            query: id => ({ id })
        }),
        getListings: builder.query<ListingForList[], CustomBaseQueryArgs["filters"]>({
            query: filters => ({ filters }),
            providesTags: (...[, , arg,]) => ([{
                type: "Listings",
                id: JSON.stringify(arg)
            }]), // defines tags associated with this endpoint
        }),
        createListing: builder.mutation<ListingForList, CreateListingFormSchemaType>({
            query: data => data,
            invalidatesTags: [{ type: "Listings" }]
        })
    })
})

export const { useGetSingleListingQuery, useGetListingsQuery, useCreateListingMutation } = listingsApi