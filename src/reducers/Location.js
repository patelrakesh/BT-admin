import { FETFH_LOCATIONITEM_DATA, FETCH_ORGANIZATIONDATA_SUCCESS, FETCH_LOCATIONTYPE_SUCCESS, FETCH_ENTITYTYPE_SUCCESS, FETCH_PROPERTYTYPE_SUCCESS, FETCH_PROPERTY_SUCCESS,  FETCH_DAYSINTERVAL_SUCCESS, EDIT_LOCATION_SUCCESS, UPDATE_LOCATION__DATA_SUCCESS, DELETE_LOCATION__DATA_SUCCESS, FETCH_REGION_SUCCESS } from '../actions/locationitem';

const initialState = {
    locationdata: [],
    orgnizationdata: [],
    locationtypedata: [],
    entitytypedata: [],
    propertytypedata: [],
    daysintervaldata: [],
    propertydata: [],
    editdata: [],
    regiondata: [],
}

const locationitem = (state = initialState, action) => {
    switch (action.type) {      
        case FETFH_LOCATIONITEM_DATA:
            return {
                ...state,                
                locationdata: action.locationdata,                
            }
        case FETCH_ORGANIZATIONDATA_SUCCESS:
            return {
                ...state,                
                orgnizationdata: action.orgnizationdata,                
            }
        case FETCH_LOCATIONTYPE_SUCCESS:
            return {
                ...state,                
                locationtypedata: action.locationtypedata,                
            } 
        case FETCH_ENTITYTYPE_SUCCESS:
            return {
                ...state,                
                entitytypedata: action.entitytypedata,                
            }
        case FETCH_PROPERTYTYPE_SUCCESS:
            return {
                ...state,                
                propertytypedata: action.propertytypedata,                
            }
        case FETCH_PROPERTY_SUCCESS:
            return {
                ...state,                
                propertydata: action.propertydata,                
            }      
        case FETCH_DAYSINTERVAL_SUCCESS:
            return {
                ...state,                
                daysintervaldata: action.daysintervaldata,                
            }
        case EDIT_LOCATION_SUCCESS:
            return {
                ...state,                
                editdata: action.editdata,                
            }   
        case UPDATE_LOCATION__DATA_SUCCESS:
            return {
                ...state,                
                locationdata: action.updateddata,                
            } 
        case FETCH_REGION_SUCCESS:
            return {
                ...state,                
                regiondata: action.regiondata,                
            }              
        case DELETE_LOCATION__DATA_SUCCESS:
            return {
                ...state,                
            }
        default:
            return state
    }
}

export default locationitem;
