export const FETCH_USERITEMDATA_SUCESS = 'FETCH_USERITEMDATA_SUCESS';
export const DATA_POST_SUCCESS = 'DATA_POST_SUCCESS';
export const FETCH_ROLE_TYPES_SUCESS = 'FETCH_ROLE_TYPES_SUCESS';
export const DATA_USER_STATUS='DATA_USER_STATUS';
export const FETCH_PRIMARY_LOCATION='FETCH_PRIMARY_LOCATION';
export const FETCH_EDIT_USER_DATA_SUCESS='FETCH_EDIT_USER_DATA_SUCESS';
export const EDIT_PRIMARY_LOCATION_DATA='EDIT_PRIMARY_LOCATION_DATA';

export function fetch_useritemdata_data(useritem_data) {
  
    return {
        type: FETCH_USERITEMDATA_SUCESS,
        useritem: useritem_data
    }
}
export function data_post_status(status, msg, page) {
    return {
        type: DATA_POST_SUCCESS,
        notificationMsg: msg,
        status: status,
        page: page,
    }
}
export function fetch_roletypes_data(roledata) {
    return {
        type: FETCH_ROLE_TYPES_SUCESS,
        roledata: roledata,
    }
}
export function primary_location_data(primarylocdata) {
    return {
        type: FETCH_PRIMARY_LOCATION,
        primarylocdata: primarylocdata
    }
}

export function data_user_status(userstatus) {
    return {
        type: DATA_USER_STATUS,
        userstatus: userstatus
    }
}

export function edit_primary_location_data(editlocationdata){
    return{
       type:EDIT_PRIMARY_LOCATION_DATA,
       editlocationdata:editlocationdata
    }
}

export function Fetch_edituser_data(edituserdata){
    return{
       type:FETCH_EDIT_USER_DATA_SUCESS,
       edituserdata:edituserdata
    }

}

