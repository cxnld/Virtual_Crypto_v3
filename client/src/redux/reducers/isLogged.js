const initialState = {
    status: false,
    jwt: null
}

const loggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                status: true,
                jwt: action.payload
            }
        case 'SIGN_OUT':
            return {
                status: false,
                jwt: null
            }
        default:
            return state
    }
}

export default loggedReducer