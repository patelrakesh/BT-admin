export const FETCH_DEVICEITEM_DATA='FETCH_DEVICEITEM_DATA';
export const FETCH_LOCATION_DATA='FETCH_LOCATION_DATA';
export const FETCH_APPLICATION_DATA='FETCH_APPLICATION_DATA';
export const FETCH_DEVICETYPE_DATA='FETCH_DEVICETYPE_DATA';
export const FETCH_DEVICEPROFILE_DATA='FETCH_DEVICEPROFILE_DATA';
export const FETCH_EDIT_DATA='FETCH_EDIT_DATA';
export const FETCH_LORA_CONFIG_DATA='FETCH_LORA_CONFIG_DATA';

export function fetch_device_item_data(devicedata) {
    return {
        type: FETCH_DEVICEITEM_DATA,
        devicedata: devicedata
    }
}

export function fetch_location_data(locationdata) {
    return {
        type: FETCH_LOCATION_DATA,
        locationdata: locationdata
    }
}

export function fetch_application_data(applicationdata) {
    return {
        type: FETCH_APPLICATION_DATA,
        applicationdata: applicationdata
    }
}

export function fetch_devicetype_data(devicetypedata) {
    return {
        type: FETCH_DEVICETYPE_DATA,
        devicetypedata: devicetypedata
    }
}

export function fetch_deviceprofile_data(deviceprofiledata) {
    return {
        type: FETCH_DEVICEPROFILE_DATA,
        deviceprofiledata: deviceprofiledata
    }
}

export function edit_device_data(editdata) {
    return {
        type: FETCH_EDIT_DATA,
        editdata: editdata
    }
}

export function fetch_lora_config_data(loraconfigdata) {
    return {
        type: FETCH_LORA_CONFIG_DATA,
        loraconfigdata: loraconfigdata
    }
}

