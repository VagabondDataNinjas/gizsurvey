import { createSelector } from 'reselect';

/**
 * Direct selector to the survey state domain
 */
const selectSurveyDomain = (state) => state.get('survey');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Survey
 */

const makeSelectSurvey = () => createSelector(
  selectSurveyDomain,
  (substate) => substate.toJS()
);

export default makeSelectSurvey;
export {
  selectSurveyDomain,
};
