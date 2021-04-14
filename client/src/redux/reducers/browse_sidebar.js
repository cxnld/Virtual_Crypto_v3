const initialState = {
    display: false,
    coin_id: null
}

const browseSidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BROWSE_SIDEBAR':
            return action.payload
        default:
            return state
    }
}

export default browseSidebarReducer
