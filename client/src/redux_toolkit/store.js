import { configureStore } from '@reduxjs/toolkit'
import isLoggedReducer from './isLoggedSlice'
import portfolioReducer from './portfolioSlice'
import browseReducer from './browseSlice'
import browseSidebarReducer from './browseSidebarSlice'

export default configureStore({
  reducer: {
    isLogged: isLoggedReducer,
    portfolio: portfolioReducer,
    browse: browseReducer,
    browseSidebar: browseSidebarReducer,
  }
})