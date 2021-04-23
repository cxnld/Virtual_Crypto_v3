import { createSlice } from '@reduxjs/toolkit'

export const browseSidebarSlice = createSlice({
    name: 'browseSidebar',

    initialState: {
        display: false,
        coin_id: null
    },

    reducers: {
        set_browse_sidebar: (state, action) => {
            state.display = action.payload.display
            state.coin_id = action.payload.coin_id
        }
    }
  
})

export const { set_browse_sidebar } = browseSidebarSlice.actions

export default browseSidebarSlice.reducer
