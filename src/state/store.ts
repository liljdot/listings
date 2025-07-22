import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { listingsSliceReducer } from './slices/listingsSlices';

const store = configureStore({
    reducer: {
        listings: listingsSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store