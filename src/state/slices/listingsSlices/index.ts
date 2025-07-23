import type { Listing, ListingForList } from "@/features/listing/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DateRange } from "react-day-picker";
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios";
import axios from "axios";

const typedApi = api as AxiosInstance

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
        addFavoriteListing: (state, action) => {
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
    }
})

export const fetchListings = createAsyncThunk("listings/fetchListings", (filters?: { search: string, guests: number, dates?: DateRange }) => {
    return typedApi.get<ListingForList[]>("/api/listings", {
        params: filters
    })
        .then(res => res.data)
})

export const { addFavoriteListing, removeFavoriteListing } = listingsSlice.actions
export const listingsSliceReducer = listingsSlice.reducer