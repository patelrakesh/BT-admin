import { FETCH_DEVICEITEM_DATA, FETCH_LOCATION_DATA, FETCH_APPLICATION_DATA, FETCH_DEVICETYPE_DATA, FETCH_DEVICEPROFILE_DATA, FETCH_EDIT_DATA, FETCH_LORA_CONFIG_DATA } from '../actions/IOTdeviceitem';

const initialState = {
    // devicedata: [],
    // locationdata: [],
    // applicationdata: [],
}

const locationitem = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEVICEITEM_DATA:
            return {
                ...state,
                devicedata: action.devicedata,
            }
        case FETCH_LOCATION_DATA:
            return {
                ...state,
                locationdata: action.locationdata,
            }
        case FETCH_APPLICATION_DATA:
            return {
                ...state,
                applicationdata: action.applicationdata,
            }
        case FETCH_DEVICETYPE_DATA:
            return {
                ...state,
                devicetypedata: action.devicetypedata,
            }
        case FETCH_DEVICEPROFILE_DATA:
            return {
                ...state,
                deviceprofiledata: action.deviceprofiledata,
            }   
        case FETCH_EDIT_DATA:
            return {
                ...state,
                editdata: action.editdata,
            }   
        case FETCH_LORA_CONFIG_DATA:
            return {
                ...state,
                loraconfigdata: action.loraconfigdata,
            }
        default:
            return state
    }
}

export default locationitem;

