export const fetchPegawai = (pegawai) =>{
    return {
        type: 'FETCH_PEGAWAI',
        payload: pegawai
    }
}
export const fetchLoading = () =>{
    return {
        type: 'FETCH_LOADING',
    }
}

export function fetchData() {
    return async (dispatch) => {
        dispatch(fetchLoading());
        const req = await fetch(`http://127.0.0.1:8000/api/pegawai`);
        const res = await req.json();
        dispatch(fetchPegawai(res));
    }
}