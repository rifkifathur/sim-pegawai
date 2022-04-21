const initState = {
    loading: false,
    pegawai: {}
}

export const pegawaiReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_LOADING': return {
            ...state,
            loading: true
        }
        case 'FETCH_PEGAWAI': return {
            loading: false,
            pegawai: action.payload
        }
    
        default: return state
    }
}