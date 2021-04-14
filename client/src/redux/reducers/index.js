import { combineReducers } from 'redux'
import portfolioReducer from './portfolio'
import browseReducer from './browse'
import loggedReducer from './isLogged'
import browseSidebarReducer from './browse_sidebar'

// rootReducer contains all our reducers
const rootReducer = combineReducers({
    portfolio: portfolioReducer,
    browse: browseReducer,
    isLogged: loggedReducer,
    browseSidebar: browseSidebarReducer
})

export default rootReducer
