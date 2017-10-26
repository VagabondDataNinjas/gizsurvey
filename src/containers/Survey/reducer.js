/*
 *
 * Survey reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_ANSWER,
  SET_USER_ID,
} from './constants';

const initialState = fromJS({
  answers: [],
  userId: '',
});

function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return state.set('userId', action.userId);
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
