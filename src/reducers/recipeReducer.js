import {
    CREATE_RECIPE_REQUEST,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_ERROR,
    GET_RECIPE_REQUEST,
    GET_RECIPE_SUCCESS,
    GET_RECIPE_ERROR,
    GET_SINGLE_RECIPE_SUCCESS
} from '../actions/recipeActions';

const initialState = {
    error:null,
    loading:false,
    message:null,
    recipes:[],
    selectedRecipe:null
};

const successMessage = "Recipe Created!";

export default function reducer(state = initialState,action){
    if(action.type === CREATE_RECIPE_REQUEST){
        return Object.assign({},state,{
            loading:true,
            error:null,
            message:null
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

    else if(action.type === GET_RECIPE_REQUEST){
        return Object.assign({},state,{
            loading:true,
            error:null,
            message:null,
            recipes:[],
            selectedRecipe:null
        });
    }

    else if(action.type === GET_RECIPE_ERROR){
        return Object.assign({},state,{
            loading:false,
            error:action.error,
            recipes:[],
            selectedRecipe:null
        });
    }

    else if(action.type === GET_RECIPE_SUCCESS){
        return Object.assign({},state,{
            loading:false,
            error:null,
            message:null,
            recipes:action.recipes
        });
    }

    else if(action.type === GET_SINGLE_RECIPE_SUCCESS){
        return Object.assign({},state,{
            loading:false,
            error:null,
            message:null,
            selectedRecipe:action.recipe
        });
    }

    return state;
}