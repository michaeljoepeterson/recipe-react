export let API_BASE_URL = "https://veggie-might-api.herokuapp.com/api" ||'http://localhost:8080/api';
//export const API_BASE_URL = 'http://localhost:8080/api';

export function setTestUrl(){
    API_BASE_URL = 'https://veggie-might-test-api.herokuapp.com/api';
}