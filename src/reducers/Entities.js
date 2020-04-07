import {
    FETCH_ENTITIES_SUCESS,
    FETCH_ADDENTITIY_TYPES_SUCESS, FETCH_SEC_ADDENTITIY_TYPES_SUCESS, FETCH_EDIT_ENTITTY_DATA_SUCESS,
    FETCH_LORA_APPTYPE_SUCESS, FETCH_LORANETAPPUP_SUCESS,
}
    from '../actions/entitiesitem';
const initialState = {
    entitiydata: [],
    entitiyuserdata: [],
    loraappdata: [],
}

const entitiyitem = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENTITIES_SUCESS:
            return {
                ...state,
                entitiydata: action.entitiydata,
            }
        case FETCH_SEC_ADDENTITIY_TYPES_SUCESS:
            return {
                ...state,
                sectordata: action.sectordata,
            }
        case FETCH_ADDENTITIY_TYPES_SUCESS:
            return {
                ...state,
                addentititiydata: action.addentititiydata,
            }
        case FETCH_EDIT_ENTITTY_DATA_SUCESS:
            return {
                ...state,
                entitiyuserdata: action.entitiyuserdata,
            }
        case FETCH_LORA_APPTYPE_SUCESS:

            return {
                ...state,
                loraappdata: action.loraappdata,
            }
        case FETCH_LORANETAPPUP_SUCESS:

            return {
                ...state,
                upadateappdata: action.upadateappdata,
            }
        default:
            return state
    }
}
export default entitiyitem;

