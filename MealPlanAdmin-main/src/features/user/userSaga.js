import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiGet, apiPost } from "../../utils/https/request";
import { requestSignIn, responseSignIn } from "./userSlice";

function* handleSignIn(action) {
  try {
    const response = yield apiPost("user/sign-in-admin", action.payload, {});

    if (response.data) {
      const { id, email, role } = response.data;
      localStorage.setItem("admin", JSON.stringify({ id, email, role }));
    }
    yield put(responseSignIn(response));
  } catch (error) {}
}

export function* userSaga() {
  yield takeLatest(requestSignIn.type, handleSignIn);
}
