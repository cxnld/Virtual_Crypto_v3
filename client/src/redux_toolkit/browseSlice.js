import { createSlice } from '@reduxjs/toolkit'

export const browseSlice = createSlice({
    name: 'browse',

    initialState: {
        coins: []
    },

    reducers: {
        populate: (state, action) => {
            state.coins = action.payload
        }
    }
  
})

export const { populate } = browseSlice.actions

export default browseSlice.reducer
