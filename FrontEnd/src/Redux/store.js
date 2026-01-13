import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/reducer";
import { customerProductReducer } from "./Customers/Product/reducer";

import { cartReducer } from "./Customers/Cart/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
