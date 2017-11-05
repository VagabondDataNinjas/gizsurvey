/*
 *
 * Survey reducer
 *
 */
import { fromJS } from 'immutable';
import {
  SUBMIT_ANSWER,
  SET_USER_ID,
  SET_QUESTIONS_DATA,
  SET_ISLANDS_DATA,
} from './constants';

const initialState = fromJS({
  answers: [],
  userId: '',
  questions: {},
  islands: [],
});

function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return state.set('userId', action.userId);
    case SET_QUESTIONS_DATA:
      return state.set('questions', fromJS(action.data));
    case SET_ISLANDS_DATA:
      return state.set('islands', fromJS(action.data));
    case SUBMIT_ANSWER:
      return state.updateIn(['answers'], (answers) => answers.push({
        type: action.questionType,
        answer: action.answer,
      }));
    default:
      return state;
  }
}

export default surveyReducer;
