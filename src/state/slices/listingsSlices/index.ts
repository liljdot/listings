import type { Listing, ListingForList } from "@/features/listing/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DateRange } from "react-day-picker";
// @ts-expect-error import from js file
import api from "@/api"
// @ts-expect-error import from js file
import { getItem, setItem } from "@/lib/utils/localStorage"
import type { AxiosInstance } from "axios";
import axios from "axios";
import { listingsApi } from "@/services/api/listingsApi";

const typedApi = api as AxiosInstance
const typedGetItem = getItem as <T>(key: string) => { lastFetched: number, data: T } | undefined
const typedSetItem = setItem as <T>(key: string, value: { lastFetched: number, data: T }) => void

const initialState: {
    listings: ListingForList[],
    isLoading: boolean,
    error: string | null,
    favoritesListingIds: Listing["id"][]
} = {
    listings: [],
    isLoading: false,
    error: null,
    favoritesListingIds: []
}

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        addFavoriteListing: (state, action: PayloadAction<Listing["id"]>) => {
            const listingId = action.payload

            if (state.favoritesListingIds.includes(listingId)) {
                return
            }

            return {
                ...state,
                favoritesListingIds: [
                    ...state.favoritesListingIds,
                    listingId
                ]
            }
        },
        removeFavoriteListing: (state, action) => {
            const listingId = action.payload

            return {
                ...state,
                favoritesListingIds: state.favoritesListingIds.filter(id => id != listingId)
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchListings.pending, state => ({
            ...state,
            isLoading: true,
            error: null
        }));
        builder.addCase(fetchListings.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            listings: action.payload
        }));
        builder.addCase(fetchListings.rejected, (state, action) => {
            if (axios.isCancel(action.error)) {
                return
            }

            return {
                ...state,
                isLoading: false,
                error: action.error.message || "Something went wrong while fetching listings"
            }
        })
        builder.addMatcher(listingsApi.endpoints.getListings.matchPending, state => ({
            ...state,
            isLoading: true,
            error: null
        }));
        builder.addMatcher(listingsApi.endpoints.getListings.matchFulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            listings: action.payload
        }));
        builder.addMatcher(listingsApi.endpoints.getListings.matchRejected, (state, action) => {
            if (axios.isCancel(action.error)) {
                return
            }

            return {
                ...state,
                isLoading: false,
                error: action.error.message || "Something went wrong while fetching listings"
            }
        })
        builder.addMatcher(listingsApi.endpoints.getSingleListing.matchFulfilled, (...[, response]) => {
            console.log("i have fetched a single listing:", response)
        })
        builder.addMatcher(listingsApi.endpoints.getSingleListing.matchRejected, (...[, response]) => {
            console.log("i have failed a single listing:", response)
        })
    }
})

export const fetchListings = createAsyncThunk("listings/fetchListings", (filters?: { search: string, guests: number, dates?: DateRange }) => {
    const STALE_TIME = 1000 * 60 * 5 // 5 minutes
    const storageKey = (() => {
        if (!filters) {
            return "/api/listings"
        }

        return `${"/api/listings"}?${JSON.stringify(filters)}`
    })()


    return new Promise<ListingForList[]>((resolve, reject) => {
        const now = new Date().getTime()
        const cachedData = typedGetItem<ListingForList[]>(storageKey) // retrieve cached data from localStorage

        if (cachedData &&
            now - cachedData.lastFetched < STALE_TIME // check if the cached data is still fresh based on the STALE_TIME
        ) {
            resolve(cachedData.data)
        } // if cached data exists and is fresh, set the data and loading state and return early

        typedApi.get<ListingForList[]>("/api/listings", {
            params: filters
        })
            .then(res => {
                const data = res.data

                typedSetItem<ListingForList[]>(storageKey, {
                    lastFetched: now,
                    data
                })

                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
})

export const { addFavoriteListing, removeFavoriteListing } = listingsSlice.actions
export const listingsSliceReducer = listingsSlice.reducer