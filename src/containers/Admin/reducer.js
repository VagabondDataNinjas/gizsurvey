/*
 *
 * Survey reducer
 *
 */
import { fromJS } from 'immutable';
import {
  ACCESS_DENIED,
  ACCESS_GRANTED,
  SET_MAP_DATA,
  SUBMIT_LOGIN,
} from './constants';

const initialState = fromJS({
  access: true,
  activeItem: 'map',
  mapData: [],
});

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ACCESS_DENIED:
      return state.merge({
        access: false,
        loading: false,
      });
    case ACCESS_GRANTED:
      return state.merge({
        access: true,
        loading: false,
      });
    case SET_MAP_DATA:
      return state.set('mapData', fromJS(action.data));
    case SUBMIT_LOGIN:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default adminReducer;
