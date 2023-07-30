import {combineReducers} from 'redux'

interface GlobalState {
    userType: string;
    currentUser: string;
    loading: boolean;
}

const initialState: GlobalState = {
    userType: "",
    currentUser: "",
    loading: false,
}

const globalReducer = (state = initialState, action:any) => {
    switch (action.type){
        case 'SET_USER_TYPE':
            return {...state, userType: action.payload};
        
        case 'SET_CURRENT_USER':
            return {...state, currentUser: action.payload};

        case 'SET_LOADING':
            return {...state, loading: action.payload};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    global: globalReducer,
});

export default rootReducer;