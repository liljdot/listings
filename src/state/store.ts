import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { listingsSliceReducer } from './slices/listingsSlices';
import { listingsApi } from '@/services/api/listingsApi';

const store = configureStore({
    reducer: {
        listings: listingsSliceReducer,
        [listingsApi.reducerPath]: listingsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listingsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store