export const populate = (data) => {
    return {
        type: 'POPULATE',
        payload: data
    }
}

export const populatePortfolio = (data) => {
    return {
        type: 'POPULATE_PORTFOLIO',
        payload: data
    }
}

export const sign_in = (data) => {
    return {
        type: 'SIGN_IN',
        payload: data
    }
}

export const sign_out = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const set_browse_sidebar = (data) => {
    return {
        type: 'SET_BROWSE_SIDEBAR',
        payload: data
    }
}