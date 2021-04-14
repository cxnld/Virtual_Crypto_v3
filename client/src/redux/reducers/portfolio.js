const initialState = {
    cash: 0,
    equity: 0,
    coins: []
}

const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_PORTFOLIO':
            return action.payload
        default:
            return state
    }
}

export default portfolioReducer
