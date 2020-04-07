import { data_post_status } from '../actions/locationitem';
import axios from 'axios';
import {
   fetch_entitiestypes_data, fetch_addentitiytypes_data, 
   Fetch_editentitty_data, fetch_loraapptype_data,fetch_sector_data
} from '../actions/entitiesitem';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';

export function fetchEntitiesData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_entitiestypes_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function fetchEntitiTypeData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entity_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_addentitiytypes_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function fetchSectorTypeData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}industry_sectors`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_sector_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function addEntitiy(val) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}entities`, val, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_entitiestypes_data(res.data.rows))
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'addentitie'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'addentitie'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function fetchLorTypeData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}lora_application_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_loraapptype_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function editentitiey(entitiyeditid) {
   let entitiyuserdata = [];
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            res.data.rows.map((item, index) => {
               if (item.id === entitiyeditid) {
                  entitiyuserdata.push(item);
               }
            })
            resolve(
               dispatch(Fetch_editentitty_data(entitiyuserdata[0]))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function updatedEntitieData(entitiyuserdata) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         // http://api.bridgethings.com/metaservice/v1/entities/lora/applications
         axios.post(`${SERVER_URL}entities/lora/applications`, entitiyuserdata, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_entitiestypes_data(res.data.rows))
   
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'appnetlora'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'appnetlora'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function updatEntityData(entitiyuserdata) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}entities`, entitiyuserdata, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_entitiestypes_data(res.data.rows))
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'editentitiey'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'editentitiey'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}



