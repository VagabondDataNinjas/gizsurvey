/*
 *
 * Survey actions
 *
 */

import {
  SUBMIT_ANSWER,
  LOAD_QUESTIONS,
  SET_USER_ID,
} from './constants';

export function submitAnswer(questionType, answer) {
  return {
    type: SUBMIT_ANSWER,
    questionType,
    answer,
  };
}

export function setUserId(userId) {
  return {
    type: SET_USER_ID,
    userId,
  };
}


export function loadQuestions() {
  return {
    type: LOAD_QUESTIONS,
  };
}

