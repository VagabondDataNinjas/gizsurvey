/*
 *
 * Survey actions
 *
 */

import {
 LOAD_MAP,
 ACCESS_DENIED,
 SET_MAP_DATA,
 SUBMIT_LOGIN,
 ACCESS_GRANTED,
} from './constants';

export function loadMap() {
  return {
    type: LOAD_MAP,
  };
}

export function setMapData(data) {
  return {
    type: SET_MAP_DATA,
    data,
  };
}

export function accessDenied() {
  return {
    type: ACCESS_DENIED,
  };
}

export function accessGranted() {
  return {
    type: ACCESS_GRANTED,
  };
}

export function submitLogin(username, password) {
  return {
    type: SUBMIT_LOGIN,
    username,
    password,
  };
}
