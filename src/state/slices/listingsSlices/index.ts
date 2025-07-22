import type { ListingForList } from "@/features/listing/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DateRange } from "react-day-picker";
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios";

const typedApi = api as AxiosInstance

const initialState: {
    listings: ListingForList[],
    isLoading: boolean,
    error: string | null
} = {
    listings: [],
    isLoading: false,
    error: null
}

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {},
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
        builder.addCase(fetchListings.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.error.message || "failed to fetch listings"
        }))
    }
})

export const fetchListings = createAsyncThunk("listings/fetchListings", (filters?: { search: string, guests: number, dates?: DateRange }) => {
    return typedApi.get<ListingForList[]>("/api/listings", {
        params: filters
    })
        .then(res => res.data)
        .catch(err => {
            throw new Error(err.message || err)
        })
})

export const listingsSliceActions = listingsSlice.actions
export const listingsSliceReducer = listingsSlice.reducer