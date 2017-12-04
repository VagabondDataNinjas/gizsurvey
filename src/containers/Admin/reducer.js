/*
 *
 * Survey reducer
 *
 */
import { fromJS } from 'immutable';
import {
} from './constants';

const initialState = fromJS({

});

function adminReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default adminReducer;
