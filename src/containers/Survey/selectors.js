import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectSurveyDomain = (state) => state.get('survey');

const selectSurveyUserId = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('userId')
);

export {
  selectSurveyUserId,
};
