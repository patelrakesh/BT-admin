import { FETCH_USERITEMDATA_SUCESS, FETCH_ROLE_TYPES_SUCESS, DATA_USER_STATUS, FETCH_PRIMARY_LOCATION, FETCH_EDIT_USER_DATA_SUCESS, EDIT_PRIMARY_LOCATION_DATA
    } from '../actions/useritem';
const initialState = {   
    error: null,
    useritem: [],
    roledata: [],
    oraganizationuseritem:[],
    userstatus:[],
    primarylocdata: [],
    editlocationdata: [],
}
const useritem = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERITEMDATA_SUCESS:
            return {
                ...state,               
                useritem: action.useritem,                
            }
        case FETCH_ROLE_TYPES_SUCESS:
            return {
                ...state,               
                roledata: action.roledata,                
            }
        case DATA_USER_STATUS:
            return {
                ...state,                
                userstatus: action.userstatus,                
            }    
        case FETCH_PRIMARY_LOCATION:
            return {
                ...state,               
                primarylocdata:action.primarylocdata,                
            }
            case FETCH_EDIT_USER_DATA_SUCESS:
                return {
                    ...state,                   
                    edituserdata: action.edituserdata,                    
                }

            case EDIT_PRIMARY_LOCATION_DATA:
                return {
                    ...state,                   
                    editlocationdata: action.editlocationdata,                    
                }        
        default:
            return state
    }
}
export default useritem;