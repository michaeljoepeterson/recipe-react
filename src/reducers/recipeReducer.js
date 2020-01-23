import {
    CREATE_RECIPE_REQUEST,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_ERROR
} from '../actions/recipeActions';

const initialState = {
    error:null,
    loading:false,
    message:null
};

const successMessage = "Recipe Created!";

export default function reducer(state = initialState,action){
    if(action.type === CREATE_RECIPE_REQUEST){
        return Object.assign({},state,{
            loading:true,
            error:null,
            authToken:null
        });
    }
    else if(action.type === CREATE_RECIPE_ERROR){
        return Object.assign({},state,{
            loading:false,
            error:action.error
        });
    }
    
    else if(action.type === CREATE_RECIPE_SUCCESS){
        return Object.assign({},state,{
            loading:false,
            error:null,
            message:successMessage
        });
    }

    return state;
}