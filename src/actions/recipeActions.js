import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const CREATE_RECIPE_REQUEST = "CREATE_RECIPE_REQUEST";

export const createRecipeRequest = () => ({
	type: CREATE_RECIPE_REQUEST
});

export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";

export const createRecipeSuccess = () => ({
	type: CREATE_RECIPE_SUCCESS
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

export const createRecipe = (recipe) => (dispatch,getState) => {
    dispatch(createRecipeRequest());
    const authToken = getState().auth.authToken;

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
        dispatch(createRecipeSuccess());
        console.log(jsonRes);
    })
    .catch(err => {
        console.log('error logging in',err);
        dispatch(createRecipeError(err));
    });
}

export const getRecipes = (skip,limit) => (dispatch,getState) => {
    
}