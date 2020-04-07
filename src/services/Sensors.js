
import { fetch_sensoritem_data, fetch_iotdevicesensor_data, fetch_manufacturers_data, fetch_sensortype_data, fetch_parameter_data, edit_sensor_data } from '../actions/sensoritem';
import axios from 'axios';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';
import { data_post_status } from '../actions/locationitem';

export function fetchSensorData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}sensors/list`, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);

               resolve(
                  dispatch(fetch_sensoritem_data(res.data.rows))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchIOTDeviceData(id) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entity/iot_devices/list?entityId=${id}`, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);

               resolve(
                  dispatch(fetch_iotdevicesensor_data(res.data))
               );
            });        
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchManufactureData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}manufacturers`, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_manufacturers_data(res.data))
               );
            });
         axios.get(`${SERVER_URL}device_types`, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_sensortype_data(res.data))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchParameterData(manufacturer, modelNo) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}manufacturers/parameters/list?manufacturer_id=${manufacturer}&model_no=${modelNo}`, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_parameter_data(res.data))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addSensor(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}sensors`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'addsensor'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'addsensor'))
            );
         });
         axios.get(`${SERVER_URL}sensors/list`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_sensoritem_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchEditSensorData(editid) {
   let editdata = [];
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}sensors/list`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            res.data.rows.map((item, index) => {
               if (item.id === editid) {
                  editdata.push(item);
               }
            })
            resolve(
               dispatch(edit_sensor_data(editdata[0]))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function editSensor(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}sensors`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'editsensor'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'editsensor'))
            );
         });
         axios.get(`${SERVER_URL}sensors/list`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_sensoritem_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}



