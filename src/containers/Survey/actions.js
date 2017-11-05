/*
 *
 * Survey actions
 *
 */

import {
  SUBMIT_ANSWER,
  SUBMIT_GPS,
  SET_USER_ID,
  LOAD_QUESTIONS,
  SET_QUESTIONS_DATA,
  LOAD_ISLANDS,
  SET_ISLANDS_DATA,
} from './constants';

export function submitAnswer(questionType, answer) {
  return {
    type: SUBMIT_ANSWER,
    questionType,
    answer,
  };
}

export function submitGPS(gps) {
  return {
    type: SUBMIT_GPS,
    gps,
  };
}

export function setQuestionsData(data) {
  return {
    type: SET_QUESTIONS_DATA,
    data,
  };
}

export function setIslandsData(data) {
  return {
    type: SET_ISLANDS_DATA,
    data,
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

export function loadIslands() {
  return {
    type: LOAD_ISLANDS,
  };
}

