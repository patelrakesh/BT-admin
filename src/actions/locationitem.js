export const FETFH_LOCATIONITEM_DATA = 'FETFH_LOCATIONITEM_DATA';
// orgnization
export const FETCH_ORGANIZATIONDATA_SUCCESS = 'FETCH_ORGANIZATIONDATA_SUCCESS';
// location types
export const FETCH_LOCATIONTYPE_SUCCESS = 'FETCH_LOCATIONTYPE_SUCCESS';
// entity types
export const FETCH_ENTITYTYPE_SUCCESS = 'FETCH_ENTITYTYPE_SUCCESS';
// property type 
export const FETCH_PROPERTYTYPE_SUCCESS = 'FETCH_PROPERTYTYPE_SUCCESS';
// property 
export const FETCH_PROPERTY_SUCCESS = 'FETCH_PROPERTY_SUCCESS';
// days interval
export const FETCH_DAYSINTERVAL_SUCCESS = 'FETCH_DAYSINTERVAL_SUCCESS';
// days interval
export const EDIT_LOCATION_SUCCESS = 'EDIT_LOCATION_SUCCESS';
// update data
export const UPDATE_LOCATION__DATA_SUCCESS = 'UPDATE_LOCATION__DATA_SUCCESS';

export const DELETE_LOCATION__DATA_SUCCESS = 'DELETE_LOCATION__DATA_SUCCESS';

export const DATA_POST_SUCCESS = 'DATA_POST_SUCCESS';

export const FETCH_REGION_SUCCESS = 'FETCH_REGION_SUCCESS';
// locations

export function data_post_status(status, msg, page) {
    return {
        type: DATA_POST_SUCCESS,
        notificationMsg: msg,
        status: status,
        page: page,
    }
}

export function fetch_locationitem_data(locationdata) {
    return {
        type: FETFH_LOCATIONITEM_DATA,
        locationdata: locationdata
    }
}

export function fetch_region_data(regiondata) {
    return {
        type: FETCH_REGION_SUCCESS,
        regiondata: regiondata
    }
}

// organization

export function fetch_organizationdata_data(orgnizationdata) {
    return {
        type: FETCH_ORGANIZATIONDATA_SUCCESS,
        orgnizationdata: orgnizationdata
    }
}

//location types

export function fetch_locationtypes_data(locationtypedata) {
    return {
        type: FETCH_LOCATIONTYPE_SUCCESS,
        locationtypedata: locationtypedata
    }
}



// ENTITY TYPES 
export function fetch_entitytypes_data(entitytypedata) {
    return {
        type: FETCH_ENTITYTYPE_SUCCESS,
        entitytypedata: entitytypedata
    }
}



// property type

export function fetch_propertytypes_data(propertytypedata) {
    return {
        type: FETCH_PROPERTYTYPE_SUCCESS,
        propertytypedata: propertytypedata
    }
}

// property

export function fetch_property_data(propertydata) {
    return {
        type: FETCH_PROPERTY_SUCCESS,
        propertydata: propertydata
    }
}

// DAYS INTERVAL
export function fetch_dayintervals_data(daysintervaldata) {
    return {
        type: FETCH_DAYSINTERVAL_SUCCESS,
        daysintervaldata: daysintervaldata
    }
}

// edit location

export function fetch_editlocation_data(editdata) {
    return {
        type: EDIT_LOCATION_SUCCESS,
        editdata: editdata
    }
}

export function update_locationitem_success(updateddata) {
    return {
        type: UPDATE_LOCATION__DATA_SUCCESS,
        updateddata: updateddata
    }
}
export function delete_location_data_success() {
    return {
        type: DELETE_LOCATION__DATA_SUCCESS,
    }
}




















