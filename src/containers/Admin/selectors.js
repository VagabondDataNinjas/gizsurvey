import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectAdminDomain = (state) => state.get('admin');


const selectMapData = () => createSelector(
  selectAdminDomain,
  (substate) => substate.get('mapData').toJS()
);


const selectAdminAccess = () => createSelector(
  selectAdminDomain,
  (substate) => substate.get('access')
);

const selectLoading = () => createSelector(
  selectAdminDomain,
  (substate) => substate.get('loading')
);

export {
  selectMapData,
  selectLoading,
  selectAdminAccess,
};
