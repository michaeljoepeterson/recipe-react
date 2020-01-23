import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import recipeReducer from './reducers/recipeReducer';

export default createStore(
	combineReducers({
		auth:authReducer,
		recipe:recipeReducer
	}),applyMiddleware(thunk)
);