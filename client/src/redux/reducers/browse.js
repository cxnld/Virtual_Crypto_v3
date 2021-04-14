const browseReducer = (state = [], action) => {
    switch (action.type) {
        case 'POPULATE':
            return action.payload
        default:
            return state
    }
}

export default browseReducer
