import type { User } from "@/features/user/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: {
    users: Record<string, User>
} = {
    users: {}
}

export const usersSlice = createSlice({
    initialState,
    name: "users",
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.id]: action.payload
                }
            }
        }
    }
})

export const { reducer: usersSliceReducer, actions: { addUser } } = usersSlice