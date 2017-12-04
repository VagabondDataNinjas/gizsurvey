// import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectAdminDomain = (state) => state.get('admin');

export {
  selectAdminDomain,
};
