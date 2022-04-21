const UserState = {
    user: {}
}

export const UserReducer = (state = UserState, action) => {
    switch (action.type){
        case 'USER': return {
            ...state,
            user: action.payload
        }

        default: return state
    }
}