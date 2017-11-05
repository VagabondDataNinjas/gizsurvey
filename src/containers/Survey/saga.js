import { takeEvery, call, all, select, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  SUBMIT_ANSWER,
  SUBMIT_GPS,
  LOAD_QUESTIONS,
  LOAD_ISLANDS,
} from './constants';
import {
  setQuestionsData,
  setIslandsData,
} from './actions';
import { selectSurveyUserId } from './selectors';

export default function* mainSaga() {
  yield all([
    takeEvery(LOAD_QUESTIONS, loadQuestions),
    takeEvery(LOAD_ISLANDS, loadIslands),
    takeEvery(SUBMIT_ANSWER, submitAnswer),
    takeEvery(SUBMIT_GPS, submitGPS),
  ]);
}

function* submitAnswer({ questionType, answer }) {
  const userId = yield select(selectSurveyUserId());
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const payload = {
    user_id: userId,
    answers: [
      {
        question_id: questionType,
        answer,
      },
    ],
  };
  yield call(request, '/api/webform/answer', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

function* submitGPS({ gps }) {
  const userId = yield select(selectSurveyUserId());
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const payload = {
    user_id: userId,
    location: {
      lat: gps.latitude,
      lon: gps.longitude,
    },
  };
  yield call(request, '/api/webform/answer-gps', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

function* loadQuestions() {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  const questions = yield call(request, '/api/webform/questions', {
    method: 'GET',
    headers,
  });
  yield put(setQuestionsData(questions));
}

function* loadIslands() {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  const islands = yield call(request, '/api/islands', {
    method: 'GET',
    headers,
  });
  yield put(setIslandsData(islands));
}

