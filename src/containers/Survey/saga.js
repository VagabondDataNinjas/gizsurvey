import { takeEvery, call, all, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  SUBMIT_ANSWER,
  LOAD_QUESTIONS,
} from './constants';
import { selectSurveyUserId } from './selectors';

export default function* mainSaga() {
  yield all([
    takeEvery(LOAD_QUESTIONS, loadQuestions),
    takeEvery(SUBMIT_ANSWER, submitAnswer),
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
  yield call(request, 'http://localhost:8888/api/webform/answer', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

function* loadQuestions() {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  yield call(request, 'http://localhost:8888/api/webform/questions', {
    method: 'GET',
    headers,
  });
}
