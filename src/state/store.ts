import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { listingsSliceReducer } from './slices/listingsSlices';
import { listingsApi } from '@/services/api/listingsApi';
import { authApi } from '@/services/api/authApi';
import { usersSliceReducer } from './slices/usersSlice';

const store = configureStore({
    reducer: {
        listings: listingsSliceReducer,
        users: usersSliceReducer,
        [listingsApi.reducerPath]: listingsApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listingsApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store