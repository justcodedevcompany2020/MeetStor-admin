const token = localStorage.getItem('token')

export const AuthLogin = ({ phone, password }) => {
    return async (dispatch) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        fetch(`${process.env.REACT_APP_HOSTNAME}/admin/login`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ phone, password })
        })
            .then(response => response.json())
            .then(res => {
                if (res.status) {
                    dispatch({
                        type: 'login',
                        payload: res
                    })
                }
                else {
                    if (res.message?.includes('wrong phone or password')) {
                        dispatch({
                            type: 'loginError',
                            payload: res
                        })
                    }
                }
            })
            .catch(error => {
                console.log('error catched--->>>', error)
            })
    }
}

// export const AuthUser = () => {
//     return async (dispatch) => {
//         const myHeaders = new Headers()
//         myHeaders.append('Content-Type', 'application/json')
//         fetch(`${process.env.REACT_APP_HOSTNAME}/api/admin/login`, {
//             method: 'GET',
//             headers: myHeaders,
//         })
//             .then(response => response.json())
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(error => {
//                 console.log('error catched--->>>', error)
//             })
//     }
// }
//     /api/get_auth_user_info zapros 2 ropen mek ete data: {} qcum em logini ej
