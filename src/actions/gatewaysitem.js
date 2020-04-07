export const FETCH_GATWAYS_SUCESS = 'FETCH_GATWAYS_SUCESS';
export const FETCH_GATWAYTYPE_SUCESS = 'FETCH_GATWAYTYPE_SUCESS';
export const FETCH_EDIT_GATEWAY_SUCESS = 'FETCH_EDIT_GATEWAY_SUCESS';

export function fetch_gatways_data(gatewaydata) {
    return {
        type: FETCH_GATWAYS_SUCESS,
        gatewaydata: gatewaydata
    }
}

export function fetch_gatwaytype_data(gatewaytypedata) {
    return {
        type: FETCH_GATWAYTYPE_SUCESS,
        gatewaytypedata: gatewaytypedata
    }
}

export function Fetch_edit_gateway_data(editdata) {
    return {
        type: FETCH_EDIT_GATEWAY_SUCESS,
        editdata: editdata
    }
}


