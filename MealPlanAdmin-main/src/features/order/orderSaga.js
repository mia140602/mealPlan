import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiGet } from "../../utils/https/request";
import { requestGetOrders, responseGetOrders } from "./orderSlice";

function* handleGetAllOrder() {
  try {
    const response = yield apiGet("order", {});

    yield put(responseGetOrders(response.data));
  } catch (error) {}
}

export function* orderSaga() {
  yield takeLatest(requestGetOrders.type, handleGetAllOrder);
}
