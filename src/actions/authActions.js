import {normalizeResponseErrors} from './utils';
//handle loading state
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type:AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (currentUser) => ({
    type:AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (error) => ({
    type:AUTH_ERROR,
    error
});
//losgout actions
export const LOGOUT = "LOGOUT";
export const logoutSession = () => ({
    type:LOGOUT
});

function getRndInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const login = (username,password) => dispatch => {
    dispatch(authRequest());
    //simulate server request
    let promise = new Promise((resolve,reject) => {
        setTimeout(function(){
            const loginSuccess = getRndInteger(0,1) === 1 ? true : false;
            console.log('login success: ',loginSuccess);
            if(loginSuccess){
                dispatch(authSuccess(username));
                resolve('success')
            }
            else{
                reject(dispatch(authError('Error')));
            } 
            
        },2000);
    });

    return promise;
};