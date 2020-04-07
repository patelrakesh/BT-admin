export const FETCH_SENSORITM_DATA = 'FETCH_SENSORITM_DATA';
export const FETCH_IOTDEVISENSOR_DATA = 'FETCH_IOTDEVISENSOR_DATA';
export const FETCH_MANUFACTURE_DATA = 'FETCH_MANUFACTURE_DATA';
export const FETCH_SENSORTYPE_DATA = 'FETCH_SENSORTYPE_DATA';
export const FETCH_PARAMETER_DATA = 'FETCH_PARAMETER_DATA';
export const FETCH_EDIT_DATA = 'FETCH_EDIT_DATA';

export function fetch_sensoritem_data(sensordata) {
    return {
        type: FETCH_SENSORITM_DATA,
        sensordata: sensordata
    }
}

export function fetch_iotdevicesensor_data(iotdevicedata) {
    return {
        type: FETCH_IOTDEVISENSOR_DATA,
        iotdevicedata: iotdevicedata
    }
}

export function fetch_manufacturers_data(manufacturedata) {
    return {
        type: FETCH_MANUFACTURE_DATA,
        manufacturedata: manufacturedata
    }
}

export function fetch_sensortype_data(sensortypedata) {
    return {
        type: FETCH_SENSORTYPE_DATA,
        sensortypedata: sensortypedata
    }
}

export function fetch_parameter_data(parameterdata) {
    return {
        type: FETCH_PARAMETER_DATA,
        parameterdata: parameterdata
    }
}

export function edit_sensor_data(editdata) {
    return {
        type: FETCH_EDIT_DATA,
        editdata: editdata
    }
}


