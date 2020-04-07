import { fetch_locationitem_data, fetch_organizationdata_data,
    fetch_locationtypes_data, fetch_entitytypes_data, fetch_propertytypes_data, 
    fetch_dayintervals_data,  fetch_property_data, fetch_editlocation_data, 
    data_post_status, fetch_region_data } from '../actions/locationitem';
import axios from 'axios';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';

let locations = { "locations": [{ 'location': "BIPL-PDI-MBG" }, { 'location': "CMASH" }, { 'location': "CMNLD" }, { 'location': "CMVBG" }] };

// axios.get(`${SERVER_URL}region/list?country=US`).then(function (res) {

export function fetchLocationItemData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      var instance = axios.create({ baseURL: SERVER_URL, timeout: 2000, });
      try {
         axios.post(`${SERVER_URL}locations`, locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_locationitem_data(res.data.rows))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchOrganizationData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entities`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_organizationdata_data(res.data.rows))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchLocationTypesData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}location_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_locationtypes_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchEntityTypesData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}entity_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_entitytypes_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchPropertyTypesData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}property_types`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_propertytypes_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchPropertyData(id) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}property/list?entity=${id}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_property_data(res.data.list))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchCityRegionData(country) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}region/list?country=${country}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_region_data(res.data.list))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchDayIntervalsData() {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.get(`${SERVER_URL}day_intervals`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_dayintervals_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addLocation(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}location`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'addlocation'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'addlocation'))
            );
         });

         axios.post(`${SERVER_URL}locations`, locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_locationitem_data(res.data.rows))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function editLocation(editid) {
   let editdata = [];
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      var entityId = '';
      try {
         axios.post(`${SERVER_URL}locations`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            res.data.rows.map((item, index) => {
               if (item.id === editid) {
                  editdata.push(item);
                  entityId = item.entityId;
               }               
            })
            axios.get(`${SERVER_URL}property/list?entity=${entityId}`, { headers: HEADER }).then(async (res1) => {
               statusMessage(dispatch, "loading", false);
               editdata[0].propertydatalist = res1.data.list;
            })
            resolve(
               dispatch(fetch_editlocation_data(editdata[0]))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function deleteLocationData(id) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.delete(`${SERVER_URL}location?id=${id}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'deletelocation'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'deletelocation'))
            );
         });
         axios.post(`${SERVER_URL}locations`, locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_locationitem_data(res.data.rows))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function updatedLocationData(id, editdata) {
   let aa = {"id":240,"zone":"aaa","aggregateId":"aaa","propertyId":33,"floor":"SR Block","locationBusinessHoursList":[]}
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}location`, editdata, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'updatelocation'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'updatelocation'))
            );
         });

         axios.post(`${SERVER_URL}locations`, locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                  dispatch(fetch_locationitem_data(res.data.rows))
               );
            });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addOrganizationData(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}entities`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'addoraganization'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'addoraganization'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}


export function addPropertyData(value) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}property`, value, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            resolve(
               dispatch(data_post_status(status, res.data, 'addproperty'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'addproperty'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}




