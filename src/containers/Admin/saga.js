import { takeEvery, all, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_MAP,
  SUBMIT_LOGIN,
  SEND_QUESTION,
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
    takeEvery(SEND_QUESTION, sendQuestion),
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
    yield put(setMapData(response));
  } catch (error) {
    yield put(accessDenied());
  }
}

function* submitLogin({ username, password }) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    yield call(request, '/api/login', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        user: username,
        pass: password,
      }),
    });
    yield put(accessGranted());
  } catch (error) {
    yield put(accessDenied());
  }
}

function* sendQuestion({ question, reply }) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    yield call(request, '/api/admin/send/custom/question', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        question_id: 'price',
        text: question,
        reply_text: reply,
      }),
    });
  } catch (error) {
    yield put(accessDenied());
  }
}
