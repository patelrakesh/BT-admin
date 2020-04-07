
import {fetch_useritemdata_data,fetch_roletypes_data, primary_location_data, edit_primary_location_data,
   Fetch_edituser_data} from '../actions/useritem';
import {data_post_status} from '../actions/locationitem';
import axios from 'axios';
import { SERVER_URL, HEADER } from '../config/config';
import statusMessage from './status';

let locations = {"locations":[{location: "BIPL-PDI-MBG"}, {location: "CMASH"}, {location: "CMNLD"}, {location: "CMVBG"}]};

export function fetchUserData() { 
    return dispatch => new Promise(async (resolve, reject) => {
       await statusMessage(dispatch, 'loading', true);       
       try {
        axios.post(`${SERVER_URL}user/list`,locations, { headers: HEADER })
             .then(async (res) => {
                statusMessage(dispatch, "loading", false);
                resolve(
                    dispatch(fetch_useritemdata_data(res.data.rows))            
                );
             });
       } catch (error) {
          reject(error);
       }
    }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function fetchRoleData(){
    return dispatch=>new Promise(async(resolve,reject)=>{
       await statusMessage(dispatch,'loading',true);
       try{
          axios.get(`${SERVER_URL}roles`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(fetch_roletypes_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchUpdateUserStatus(val){
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}users`, val, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.post(`${SERVER_URL}user/list`,locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                   dispatch(fetch_useritemdata_data(res.data.rows))            
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'userstatus'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'userstatus'))
            );
         });         
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchPrimaryLocation(entityid) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);      
      try {
         axios.get(`${SERVER_URL}user_locations?entity=${entityid}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(primary_location_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function fetchEditPrimaryLocation(entityid, userid) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);      
      try {
         axios.get(`${SERVER_URL}user_locations?entity=${entityid}&user=${userid}`, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            resolve(
               dispatch(edit_primary_location_data(res.data))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}

export function addUser(val) {
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.post(`${SERVER_URL}users`, val, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);     
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.post(`${SERVER_URL}user/list`,locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
            
               resolve(
                   dispatch(fetch_useritemdata_data(res.data.rows))            
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'adduser'))
            );            
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'adduser'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function editUser(usereditid){
   let edituserdata=[];
   return dispatch =>new Promise(async(resolve,reject)=>{
      await statusMessage(dispatch,'loading',true);
      try{
         axios.post(`${SERVER_URL}user/list`, locations, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            res.data.rows.map((item, index) => {
               if (item.id === usereditid) {
                  edituserdata.push(item);              
               }  

            })  
            resolve(
               dispatch(Fetch_edituser_data(edituserdata[0]))
              
            );

         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
export function updatedUserData(id, editdata) {
   let aa = {"id":240,"zone":"aaa","aggregateId":"aaa","propertyId":33,"floor":"SR Block","locationBusinessHoursList":[]}
   return dispatch => new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      try {
         axios.put(`${SERVER_URL}users`, editdata, { headers: HEADER }).then(async (res) => {
            statusMessage(dispatch, "loading", false);
            var status = '';
            if (res.status === 200 && res.data !== '') {
               status = 'success';
            }
            if (res.status === 200 && res.data === '') {
               status = 'error';
            }
            axios.post(`${SERVER_URL}user/list`,locations, { headers: HEADER })
            .then(async (res) => {
               statusMessage(dispatch, "loading", false);
               resolve(
                   dispatch(fetch_useritemdata_data(res.data.rows))            
               );
            });
            resolve(
               dispatch(data_post_status(status, res.data, 'edituser'))
            );
         }).catch(error => {
            statusMessage(dispatch, 'error', error);
            reject(error);
            resolve(
               dispatch(data_post_status('error', error, 'edituser'))
            );
         });
      } catch (error) {
         reject(error);
      }
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err); throw err; });
}
