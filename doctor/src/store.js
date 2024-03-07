import { applyMiddleware, createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";

import { userReducer } from "./reducers/user";
import { appointmentReducer } from "./reducers/appointment";

const reducer = combineReducers({
    user: userReducer,
    appointment: appointmentReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
