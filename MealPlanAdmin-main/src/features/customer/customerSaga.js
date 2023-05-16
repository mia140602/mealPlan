import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiGet } from "../../utils/https/request";
import { requestGetCustomers, responseGetCustomers } from "./customerSlice";

function* handleGetAllCustomer() {
  try {
    const response = yield apiGet("user", {});

    yield put(responseGetCustomers(response.data));
  } catch (error) {}
}

export function* customerSaga() {
  yield takeLatest(requestGetCustomers.type, handleGetAllCustomer);
}
