import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  contactListReducer,
  contactFavouriteListReducer,
  contactDetailsReducer,
  contactDeleteReducer,
  contactCreateReducer,
  contactUpdateReducer,
} from "./reducers/contactReducers";

const reducer = combineReducers({
  contactList: contactListReducer,
  contactDetails: contactDetailsReducer,
  contactDelete: contactDeleteReducer,
  contactCreate: contactCreateReducer,
  contactUpdate: contactUpdateReducer,
  contactFavouriteList: contactFavouriteListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
