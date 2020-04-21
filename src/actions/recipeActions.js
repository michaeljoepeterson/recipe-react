import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
//use for generic update/post request to recipes
export const CREATE_RECIPE_REQUEST = "CREATE_RECIPE_REQUEST";

export const createRecipeRequest = () => ({
	type: CREATE_RECIPE_REQUEST
});

export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";

export const createRecipeSuccess = (message) => ({
    type: CREATE_RECIPE_SUCCESS,
    message
});

export const CREATE_RECIPE_ERROR = "CREATE_RECIPE_ERROR";

export const createRecipeError = error =>( {
	type: CREATE_RECIPE_ERROR,
	error
});

export const GET_RECIPE_REQUEST = "GET_RECIPE_REQUEST";

export const getRecipeRequest = () => ({
	type: GET_RECIPE_REQUEST
});

export const GET_RECIPE_SUCCESS = "GET_RECIPE_SUCCESS";

export const getRecipeSuccess = (recipes) => ({
    type: GET_RECIPE_SUCCESS,
    recipes
});

export const GET_RECIPE_ERROR = "GET_RECIPE_ERROR";

export const getRecipeError = error =>( {
	type: GET_RECIPE_ERROR,
	error
});

export const GET_SINGLE_RECIPE_SUCCESS = "GET_SINGLE_RECIPE_SUCCESS";

export const getSingleRecipeSuccess = (recipe) => ({
    type: GET_SINGLE_RECIPE_SUCCESS,
    recipe
});

export const createRecipe = (recipe) => (dispatch,getState) => {
    dispatch(createRecipeRequest());
    const authToken = getState().auth.authToken;
    let promise = new Promise((resolve,reject) => {
        return fetch(`${API_BASE_URL}/recipes`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body:JSON.stringify(recipe)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((jsonRes) => {
            const message = "Recipe Created!";
            dispatch(createRecipeSuccess(message));
            console.log(jsonRes);
            resolve(jsonRes);
        })
        .catch(err => {
            console.log('error creating: ',err);
            dispatch(createRecipeError(err));
            reject(err);
        });
    });
    

    return promise
}

export const updateRecipe = (recipe,handle) => (dispatch,getState) => {
    dispatch(createRecipeRequest());
    const authToken = getState().auth.authToken;
    let promise = new Promise((resolve,reject) => {
        return fetch(`${API_BASE_URL}/recipes/${handle}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body:JSON.stringify(recipe)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((jsonRes) => {
            const message = "Recipe Updated!";
            dispatch(createRecipeSuccess(message));
            console.log(jsonRes);
            resolve(jsonRes);
        })
        .catch(err => {
            console.log('error updating: ',err);
            dispatch(createRecipeError(err));
            reject(err);
        });
    });
    

    return promise
}

export const getRecipes = (skip,limit) => (dispatch) => {
    dispatch(getRecipeRequest());
    skip = skip ? skip : null;
    limit = limit ? limit : null;
    const query = `recipes-get?skip=${skip}&limit=${limit}`
    return fetch(`${API_BASE_URL}/${query}`,{
        method:'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((jsonRes) => {
        dispatch(getRecipeSuccess(jsonRes.recipes));
        console.log(jsonRes);
    })
    .catch(err => {
        console.log('error getting recipes',err);
        dispatch(getRecipeError(err));
    });
}

export const getSingleRecipe = (handle) => (dispatch) => {
    dispatch(getRecipeRequest());
    const query = `recipes-get/${handle}`
    return fetch(`${API_BASE_URL}/${query}`,{
        method:'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((jsonRes) => {
        dispatch(getSingleRecipeSuccess(jsonRes.recipe[0]));
        console.log(jsonRes);
    })
    .catch(err => {
        console.log('error getting recipes',err);
        dispatch(getRecipeError(err));
    });
}