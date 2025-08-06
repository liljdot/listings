import { createSlice } from "@reduxjs/toolkit"

const initialState: {
    users: object
} = {
    users: {}
}

export const usersSlice = createSlice({
    initialState,
    name: "users",
    reducers: {
        addUser: (state, action) => {
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