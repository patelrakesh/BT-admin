import { FETCH_SIDENAVITEM_SUCCESS, FETCH_TOPUSERITEM_SUCCESS,FETCH_ACCOUNTITEM_SUCCESS, LOGIN_USER_STATUS, RESET_PASSWORD } from '../actions/sidenavitem';

const initialState = {
    pending: false,
    sidenavdata: [],
    topuserdata: [],
    accountdata:[],
    error: null
}

const sidenavitem = (state = initialState, action) => {
    switch (action.type) {     
        case FETCH_SIDENAVITEM_SUCCESS:
            return {
                ...state,
                pending: false,
                sidenavdata: action.sidenavdata,
                error: ''
            }
        case FETCH_TOPUSERITEM_SUCCESS:
            return {
                ...state,
                pending: false,
                topuserdata: action.topuserdata,
                error: ''
            }        
       case FETCH_ACCOUNTITEM_SUCCESS:         
           return{
               ...state,
               pending:false,
               accountdata:action.accountdata,
               error:''
           }
       case LOGIN_USER_STATUS:         
           return{
               ...state,
               pending:false,
               status:action.status,
               res_data: action.res_data,
               error:''
           }   
       case RESET_PASSWORD:
           return{
               ...state,
               pending:false,
               reset_send_data:action.data,
               error:''
           }                    
        default:
            return state
    }
}

export default sidenavitem;
