import type { Listing } from "@/features/listing/types";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios";
import type { Review, ReviewForList } from "@/features/review/types";

const typedApi = api as AxiosInstance

const customBaseQuery: BaseQueryFn<Listing["id"], unknown, unknown> = (data) => {

    return typedApi.get<Review[]>("/api/reviews", {
        params: { listingId: data }
    })
}

export const reviewsApi = createApi({
    reducerPath: "api/reviewsApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Reviews"],
    endpoints: builder => ({
        getListingReviews: builder.query<ReviewForList[], Listing["id"]>({
            query: data => data,
            providesTags: (...[, , arg]) => [
                {
                    type: "Reviews",
                    id: arg
                }
            ]
        })
    })
})

export const { useGetListingReviewsQuery } = reviewsApi