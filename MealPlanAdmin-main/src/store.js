import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSaga } from "./features/user/userSaga";
import { productSaga } from "./features/product/productSaga";
import { customerSaga } from "./features/customer/customerSaga";
import { orderSaga } from "./features/order/orderSaga";

import { all } from "redux-saga/effects";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import customerReducer from "./features/customer/customerSlice";
import orderReducer from "./features/order/orderSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  customer: customerReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([userSaga(), productSaga(), customerSaga(), orderSaga()]);
}

sagaMiddleware.run(rootSaga);

/*
  
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
*/
