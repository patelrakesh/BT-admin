export const FETCH_ENTITIES_SUCESS='FETCH_ENTITIES_SUCESS';
export const FETCH_ADDENTITIY_TYPES_SUCESS='FETCH_ADDENTITIY_TYPES_SUCESS';
export const FETCH_SEC_ADDENTITIY_TYPES_SUCESS='FETCH_SEC_ADDENTITIY_TYPES_SUCESS';
export const FETCH_EDIT_ENTITTY_DATA_SUCESS='FETCH_EDIT_ENTITTY_DATA_SUCESS';
export const FETCH_LORA_APPTYPE_SUCESS='FETCH_LORA_APPTYPE_SUCESS';
export const FETCH_LORANETAPPUP_SUCESS='FETCH_LORANETAPPUP_SUCESS';

export function fetch_entitiestypes_data(entitiydata) {
 
    return {
        type: FETCH_ENTITIES_SUCESS,
        entitiydata: entitiydata
    }
}
export function fetch_addentitiytypes_data(addentititiydata){
    return{
        type:FETCH_ADDENTITIY_TYPES_SUCESS,
        addentititiydata:addentititiydata
    }
}
export function fetch_sector_data(sectordata){
  
    return{
        type:FETCH_SEC_ADDENTITIY_TYPES_SUCESS,
        sectordata:sectordata
    }
}
export function Fetch_editentitty_data(entitiyuserdata){
    
    return{
      type:FETCH_EDIT_ENTITTY_DATA_SUCESS,
      entitiyuserdata:entitiyuserdata
    }
}
export function fetch_loraapptype_data(loraappdata){
   
    return{
        type:FETCH_LORA_APPTYPE_SUCESS,
        loraappdata:loraappdata
    }
}
export function fetch_loranetappupadate_success(upadateappdata){
    return{
        type:FETCH_LORANETAPPUP_SUCESS,
        upadateappdata:upadateappdata
        
    }
}

