import { FETCH_GATWAYS_SUCESS, FETCH_GATWAYTYPE_SUCESS, FETCH_EDIT_GATEWAY_SUCESS } from '../actions/gatewaysitem';

const initialState = {
}

const entitiyitem = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GATWAYS_SUCESS:
            return {
                ...state,
                gatewaydata: action.gatewaydata,
            }
        case FETCH_GATWAYTYPE_SUCESS:
            return {
                ...state,
                gatewaytypedata: action.gatewaytypedata,
            }        
        case FETCH_EDIT_GATEWAY_SUCESS:
            return {
                ...state,
                editdata: action.editdata,
            }                  
        default:
            return state
    }
}
export default entitiyitem;

