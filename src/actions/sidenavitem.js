
export const FETCH_SIDENAVITEM_SUCCESS = 'FETCH_SIDENAVITEM_SUCCESS';
export const FETCH_TOPUSERITEM_SUCCESS = 'FETCH_TOPUSERITEM_SUCCESS';
export const FETCH_ACCOUNTITEM_SUCCESS = 'FETCH_ACCOUNTITEM_SUCCESS';
export const LOGIN_USER_STATUS = 'LOGIN_USER_STATUS';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export function fetch_sidenavitem_success(sidenavdata) {
    return {
        type: FETCH_SIDENAVITEM_SUCCESS,
        sidenavdata:sidenavdata
    }
}
export function fetch_topUseritem_success(topuserdata) {
    return {
        type: FETCH_TOPUSERITEM_SUCCESS,
        topuserdata:topuserdata
    }
}
export function fetch_accountdata_success(accountdata){
    return{
        type:FETCH_ACCOUNTITEM_SUCCESS,
        accountdata:accountdata
    }
}

export function login_user(status, data){
    return{
        type:LOGIN_USER_STATUS,
        status:status,
        res_data: data,
    }
}

export function reset_password(data){
    return{
        type:RESET_PASSWORD,
        data:data,
    }
}


