import { data_post_status } from '../actions/locationitem';
import axios from 'axios';
import { fetch_device_item_data, fetch_location_data, fetch_application_data, fetch_devicetype_data, fetch_deviceprofile_data, edit_device_data, fetch_lora_config_data } from '../actions/IOTdeviceitem';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';

let locations = { "locations": [{ "location": "APL-VDC-757" }, { "location": "APL-VDC-7S8" }, { "location": "APL-VDC-884" }, { "location": "APL-VDC-AAA" }, { "location": "APL-VDC-ABB" }, { "location": "APL-VDC-ABC" }, { "location": "APL-VDC-ACA" }, { "location": "APL-VDC-ADD" }, { "location": "APL-VDC-APE" }, { "location": "APL-VDC-AQQ" }, { "location": "APL-VDC-BAA" }, { "location": "APL-VDC-BC " }, { "location": "APL-VDC-BMM" }, { "location": "APL-VDC-BNW" }, { "location": "APL-VDC-BCC" }, { "location": "APL-VDC-BC-" }, { "location": "APL-VDC-BTE" }, { "location": "APL-VDC-CTA" }, { "location": "APL-VDC-DGG" }, { "location": "APL-VDC-DGD" }, { "location": "APL-VDC-DRF" }, { "location": "APL-VDC-DDG" }, { "location": "APL-VDC-DAD" }, { "location": "APL-VDC-DDS" }, { "location": "APL-VDC-EWR" }, { "location": "APL-VDC-ERF" }, { "location": "APL-VDC-ERE" }, { "location": "APL-VDC-ERR" }, { "location": "APL-VDC-ERW" }, { "location": "APL-VDC-ETH" }, { "location": "APL-VDC-FGH" }, { "location": "APL-VDC-FHK" }, { "location": "APL-VDC-FRF" }, { "location": "APL-VDC-FFR" }, { "location": "APL-VDC-FFF" }, { "location": "APL-VDC-FDF" }, { "location": "APL-VDC-FFS" }, { "location": "APL-VDC-GGG" }, { "location": "APL-VDC-GYY" }, { "location": "APL-VDC-GGF" }, { "location": "APL-VDC-GGT" }, { "location": "APL-VDC-GFG" }, { "location": "APL-VDC-GFH" }, { "location": "APL-VDC-GRT" }, { "location": "APL-VDC-GTH" }, { "location": "APL-VDC-GTR" }, { "location": "APL-VDC-GTG" }, { "location": "APL-VDC-GH3" }, { "location": "APL-VDC-G1R" }, { "location": "APL-VDC-GH2" }, { "location": "APL-VDC-GH8" }, { "location": "APL-VDC-GTT" }, { "location": "APL-VDC-HGG" }, { "location": "APL-VDC-HHN" }, { "location": "APL-VDC-HNN" }, { "location": "APL-VDC-HGN" }, { "location": "APL-VDC-HYY" }, { "location": "APL-VDC-HHT" }, { "location": "APL-VDC-HHH" }, { "location": "APL-VDC-ILK" }, { "location": "APL-VDC-IUO" }, { "location": "APL-VDC-JBK" }, { "location": "APL-VDC-JGJ" }, { "location": "APL-VDC-JJL" }, { "location": "APL-VDC-JJK" }, { "location": "APL-VDC-KIK" }, { "location": "APL-VDC-LBE" }, { "location": "APL-VDC-LBB" }, { "location": "APL-VDC-LBL" }, { "location": "APL-VDC-MIN" }, { "location": "APL-VDC-MBS" }, { "location": "APL-VDC-MBG" }, { "location": "APL-VDC-NNN" }, { "location": "APL-VDC-OPP" }, { "location": "APL-VDC-QQQ" }, { "location": "APL-VDC-QQW" }, { "location": "APL-VDC-REH" }, { "location": "APL-VDC-RRE" }, { "location": "APL-VDC-RWE" }, { "location": "APL-VDC-RTT" }, { "location": "APL-VDC-RTY" }, { "location": "APL-VDC-RYH" }, { "location": "APL-VDC-RYU" }, { "location": "APL-VDC-SFD" }, { "location": "APL-VDC-SSF" }, { "location": "APL-VDC-SVS" }, { "location": "APL-VDC-STH" }, { "location": "APL-VDC-TST" }, { "location": "APL-VDC-TSS" }, { "location": "APL-VDC-TNA" }, { "location": "APL-VDC-TT3" }, { "location": "APL-VDC-TTG" }, { "location": "APL-VDC-THH" }, { "location": "APL-VDC-TTH" }, { "location": "APL-VDC-TEC" }, { "location": "APL-VDC-TRR" }, { "location": "APL-VDC-TRH" }, { "location": "APL-VDC-TTT" }, { "location": "APL-VDC-TTR" }, { "location": "APL-VDC-TTY" }, { "location": "APL-VDC-UII" }, { "location": "APL-VDC-UJJ" }, { "location": "APL-VDC-WEF" }, { "location": "APL-VDC-WWD" }, { "location": "APL-VDC-WGG" }, { "location": "APL-VDC-W3R" }, { "location": "APL-VDC-WWE" }, { "location": "APL-VDC-WEE" }, { "location": "APL-VDC-WQQ" }, { "location": "APL-VDC-WQW" }, { "location": "APL-VDC-WEG" }, { "location": "APL-VDC-WWW" }, { "location": "APL-VDC-XVG" }, { "location": "APL-VDC-YHY" }, { "location": "APL-VDC-YHH" }, { "location": "APL-VDC-YTH" }, { "location": "APL-VDC-YHJ" }, { "location": "APL-VDC-YTY" }, { "location": "APL-VDC-YYH" }, { "location": "APL-VDC-YYU" }, { "location": "APL-VDC-YYY" }, { "location": "BIPL-PDI-344" }, { "location": "BIPL-PDI-DFF" }, { "location": "BIPL-PDI-EWF" }, { "location": "BIPL-PDI-EWE" }, { "location": "BIPL-PDI-ETT" }, { "location": "BIPL-PDI-EWW" }, { "location": "BIPL-PDI-GTH" }, { "location": "BIPL-PDI-GTG" }, { "location": "BIPL-PDI-GEF" }, { "location": "BIPL-PDI-JYY" }, { "location": "BIPL-PDI-JYU" }, { "location": "BIPL-PDI-KII" }, { "location": "BIPL-PDI-MIN" }, { "location": "BIPL-PDI-MBG" }, { "location": "BIPL-PDI-NHN" }, { "location": "BIPL-PDI-QQQ" }, { "location": "BIPL-PDI-REH" }, { "location": "BIPL-PDI-RRY" }, { "location": "BIPL-PDI-SDF" }, { "location": "BIPL-PDI-SEG" }, { "location": "BIPL-PDI-SSF" }, { "location": "BIPL-PDI-TYY" }, { "location": "BIPL-PDI-TTH" }, { "location": "CMASH" }, { "location": "CMHKLASH-RFE" }, { "location": "CMNLD" }, { "location": "CMNLD-RTT" }, { "location": "CMVBG" }, { "location": "MLRIT-DCS-ABK" }, { "location": "MLRIT-DCS" }, { "location": "MLRIT-DCS-JBK" }, { "location": "MLRIT-DCS-MLB" }, { "location": "MLRIT-DCS-MBK" }, { "location": "MLRIT-DCS-MBC" }, { "location": "MLRIT-DCS-SBK" }, { "location": "MLRIT-DCS-YYY" }] };

export function fetchIOTDeviceData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}iot_devices/list`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_device_item_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchLocationData(entityid) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}location/list?entity=${entityid}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_location_data(res.data.list))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchApplicationData(entityid) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entity/id?id=${entityid}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_application_data(res.data.applications))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchDeviceTypeData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}device_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_devicetype_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchProfileData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}device_profile_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_deviceprofile_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addIotdevicesData(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}iot_devices`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'adddevice'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'adddevice'))
            );
         });
         axios.post(`${SERVER_URL}iot_devices/list`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_device_item_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchEditData(editid) {
   let editdata = [];
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      var entityId = '';
      try {
         axios.post(`${SERVER_URL}iot_devices/list`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            res.data.rows.map((item, index) => {
               if (item.id === editid) {
                  editdata.push(item);
                  entityId = item.entityId;
               }
            })
            resolve(
               dispatch(edit_device_data(editdata[0]))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function updateIotdevicesData(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}iot_devices`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'editdevice'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'editdevice'))
            );
         });
         axios.post(`${SERVER_URL}iot_devices/list`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_device_item_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchLoraConfig(deviceid) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}iot_device/loraconfig?deviceId=${deviceid}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_lora_config_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function sendLoraConfig(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}iot_device/loraconfig`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'loraconfig'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'loraconfig'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}



