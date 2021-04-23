import { createSlice } from '@reduxjs/toolkit'

// createSlice is going to make our reducer for us
export const portfolioSlice = createSlice({
    name: 'portfolio',

    initialState: {
        cash: 0,
        equity: 0,
        coins: []
    },

    reducers: {
        populate: (state, action) => {
            state.cash = action.payload.cash
            state.equity = action.payload.equity
            state.coins = action.payload.coins
        }
    }
  
})

/* this is what portfolioSlice really looks like
{
    name: 'portfolio',
    actions: {
        populate
    },
    reducer
}
*/

// Destructuring the actions for export so that dispatch can use it
export const { populate } = portfolioSlice.actions

// Exporting the reducer so we can pass it to the store
export default portfolioSlice.reducer
