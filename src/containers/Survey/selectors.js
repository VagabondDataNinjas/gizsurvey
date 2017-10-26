import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectSurveyDomain = (state) => state.get('survey');

const selectSurveyUserId = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('userId')
);

const selectSurveyQuestions = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.get('questions').toJS()
);

export {
  selectSurveyUserId,
  selectSurveyQuestions,
};
