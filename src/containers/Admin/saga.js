import { takeEvery, all, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_MAP,
  SUBMIT_LOGIN,
} from './constants';
import {
  accessDenied,
  accessGranted,
  setMapData,
} from './actions';
import { } from './selectors';

export default function* mainSaga() {
  yield all([
    takeEvery(LOAD_MAP, loadMap),
    takeEvery(SUBMIT_LOGIN, submitLogin),
  ]);
}

function* loadMap() {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = yield call(request, '/api/admin/location-prices', {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    if (response.status !== '200') {
      yield put(accessDenied());
    } else {
      yield put(setMapData(response.data));
    }
  } catch (error) {
    yield put(accessDenied());
  }
}

function* submitLogin({ username, password }) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = yield call(request, '/api/login', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        user: username,
        pass: password,
      }),
    });
    if (response.status !== '200') {
      yield put(accessDenied());
    } else {
      yield put(accessGranted());
    }
  } catch (error) {
    yield put(accessDenied());
  }
}
