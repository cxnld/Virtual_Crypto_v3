import { createSlice } from '@reduxjs/toolkit'

export const isLoggedSlice = createSlice({
    name: 'isLogged',

    initialState: {
        status: false,
        jwt: null
    },

    reducers: {
        sign_in: (state, action) => {
            state.status = true
            state.jwt = action.payload
        },
        sign_out: (state) => {
            state.status = false
            state.jwt = null
        }
    }
  
})

export const { sign_in, sign_out } = isLoggedSlice.actions

export default isLoggedSlice.reducer
