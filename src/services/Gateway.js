import { data_post_status } from '../actions/locationitem';
import axios from 'axios';
import { fetch_gatways_data, fetch_gatwaytype_data, Fetch_edit_gateway_data } from '../actions/gatewaysitem';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';

export function fetchGatwaysData() {
    return dispatch => new Promise(async (resolve, reject) => {
        await statusMessage(dispatch, 'loading', true);
        try {
            axios.get(`${SERVER_URL}gateways`, { headers: HEADER }).then(async (res) => {
                statusMessage(dispatch, "loading", false);
                resolve(
                    dispatch(fetch_gatways_data(res.data.rows))
                );
            });
        } catch (error) {
            reject(error);
        }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchGatwayTypeData() {
    return dispatch => new Promise(async (resolve, reject) => {
        await statusMessage(dispatch, 'loading', true);
        try {
            axios.get(`${SERVER_URL}gateway_types`, { headers: HEADER }).then(async (res) => {
                statusMessage(dispatch, "loading", false);
                resolve(
                    dispatch(fetch_gatwaytype_data(res.data))
                );
            });
        } catch (error) {
            reject(error);
        }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addGateway(val) {
    return dispatch => new Promise(async (resolve, reject) => {
        await statusMessage(dispatch, 'loading', true);
        try {
            axios.post(`${SERVER_URL}gateway`, val, { headers: HEADER }).then(async (res) => {
                statusMessage(dispatch, "loading", false);
                var status = '';
                if (res.status === 200 && res.data !== '') {
                    status = 'success';
                }
                if (res.status === 200 && res.data === '') {
                    status = 'error';
                }
                axios.get(`${SERVER_URL}gateways`, { headers: HEADER }).then(async (res) => {
                    statusMessage(dispatch, "loading", false);
                    resolve(
                        dispatch(fetch_gatways_data(res.data.rows))
                    );
                });
                resolve(
                    dispatch(data_post_status(status, res.data, 'addgateway'))
                );
            }).catch(error => {
                statusMessage(dispatch, 'error', error);
                reject(error);
                resolve(
                    dispatch(data_post_status('error', error, 'addgateway'))
                );
            });
        } catch (error) {
            reject(error);
        }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchEditData(editid) {
    let gatewaydata = [];
    return dispatch => new Promise(async (resolve, reject) => {
       await statusMessage(dispatch, 'loading', true);
       try {
          axios.get(`${SERVER_URL}gateways`, { headers: HEADER }).then(async (res) => {
             statusMessage(dispatch, "loading", false);
             res.data.rows.map((item, index) => {
                if (item.id === editid) {
                    gatewaydata.push(item);
                }
             })
             resolve(
                dispatch(Fetch_edit_gateway_data(gatewaydata[0]))
             );
          });
       } catch (error) {
          reject(error);
       }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function editGateway(val) {
    return dispatch => new Promise(async (resolve, reject) => {
        await statusMessage(dispatch, 'loading', true);
        try {
            axios.put(`${SERVER_URL}gateway`, val, { headers: HEADER }).then(async (res) => {
                statusMessage(dispatch, "loading", false);
                var status = '';
                if (res.status === 200 && res.data !== '') {
                    status = 'success';
                }
                if (res.status === 200 && res.data === '') {
                    status = 'error';
                }
                axios.get(`${SERVER_URL}gateways`, { headers: HEADER }).then(async (res) => {
                    statusMessage(dispatch, "loading", false);
                    resolve(
                        dispatch(fetch_gatways_data(res.data.rows))
                    );
                });
                resolve(
                    dispatch(data_post_status(status, res.data, 'editgateway'))
                );
            }).catch(error => {
                statusMessage(dispatch, 'error', error);
                reject(error);
                resolve(
                    dispatch(data_post_status('error', error, 'editgateway'))
                );
            });
        } catch (error) {
            reject(error);
        }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}







