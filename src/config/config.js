export const SERVER_URL = 'http://13.232.194.73:8081/metaservice/v1/';

const authToken = localStorage.getItem('BTauthToken');

export const HEADER = {
   
        'Content-Type': 'application/json',
        'authToken': authToken
    
};

