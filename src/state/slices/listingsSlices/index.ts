import type { Listing } from "@/features/listing/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Listing[] = []

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {}
})

export const listingsSliceActions = listingsSlice.actions
export const listingsSliceReducer = listingsSlice.reducer