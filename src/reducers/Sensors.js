import { FETCH_SENSORITM_DATA, FETCH_IOTDEVISENSOR_DATA, FETCH_MANUFACTURE_DATA, FETCH_SENSORTYPE_DATA, FETCH_PARAMETER_DATA, FETCH_EDIT_DATA } from '../actions/sensoritem';
const initialState = {
    // sensordata:[],
    // locasensitem:[],
    // iotdevicedata:[]
}

const sensoritem = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SENSORITM_DATA:
            return {
                ...state,
                sensordata: action.sensordata,
            }
        case FETCH_IOTDEVISENSOR_DATA:
            return {
                ...state,
                iotdevicedata: action.iotdevicedata,
            }
        case FETCH_MANUFACTURE_DATA:
            return {
                ...state,
                manufacturedata: action.manufacturedata
            }
        case FETCH_SENSORTYPE_DATA:
            return {
                ...state,
                sensortypedata: action.sensortypedata
            }  
        case FETCH_PARAMETER_DATA:
            return {
                ...state,
                parameterdata: action.parameterdata
            } 
        case FETCH_EDIT_DATA:
            return {
                ...state,
                editdata: action.editdata
            }                                    
        default:
            return state
    }
}


export default sensoritem;


