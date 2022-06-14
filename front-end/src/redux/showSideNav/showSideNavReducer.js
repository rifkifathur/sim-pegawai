const showState = {
    showSideNav: true
}

export const showSideNavReducer = (state = showState, action) => {
    switch (action.type) {
        case 'SHOW_SIDE_NAV': return {
            showSideNav: action.payload
        }
        default: return state
    }
}