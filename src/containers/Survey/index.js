/**
 *
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PropsRoute from 'components/PropsRoute';
// import GPSLocation from './Steps/GPSLocation/Loadable';
import SocialPosition from './Steps/SocialPosition/Loadable';
import Price from './Steps/Price/Loadable';
// import LineID from './Steps/LineID/Loadable';
import IslandName from './Steps/IslandName/Loadable';
import End from './Steps/End/Loadable';

import {
  loadQuestions,
  loadIslands,
  submitAnswer,
  submitGPS,
  setUserId,
} from './actions';
import { selectSurveyQuestions, selectSurveyIslands } from './selectors';
import reducer from './reducer';
import saga from './saga';

const steps = [
  { questionType: 'job', component: SocialPosition },
  // { questionType: 'lineid', component: LineID },
  // { questionType: 'gps', component: GPSLocation },
  { questionType: 'island', component: IslandName },
  { questionType: 'price', component: Price },
  { questionType: 'thank_you', component: End },
];

class Survey extends React.PureComponent {
  constructor() {
    super();
    this.handleOnComplete = this.handleOnComplete.bind(this);
    this.state = {
      currentStep: steps[0].questionType,
    };
  }

  componentWillMount() {
    const { location, dispatchLoadQuestions, dispatchLoadIslands, dispatchSetUserId } = this.props;
    const query = queryString.parse(location.search);
    dispatchSetUserId(query.uid ? query.uid : '');
    dispatchLoadQuestions();
    dispatchLoadIslands();
  }

  getNextStep(questionType) {
    let nextStep = null;
    steps.forEach((step, i) => {
      if (step.questionType === questionType) {
        nextStep = steps[i + 1].questionType;
      }
    });
    return nextStep;
  }

  handleOnComplete(questionType, answer) {
    const { onSubmitAnswer, onSubmitGPS } = this.props;
    if (questionType === 'gps') {
      if (answer.coords) {
        onSubmitGPS(answer.coords);
      }
    } else {
      onSubmitAnswer(questionType, answer);
    }
    const nextStep = this.getNextStep(questionType);
    this.setState({
      currentStep: nextStep,
    });
  }

  render() {
    const { questions, islands, location: { pathname } } = this.props;
    const { currentStep } = this.state;
    if (pathname !== `/${currentStep}`) {
      return <Redirect to={`/${currentStep}`} />;
    }
    if (!questions[currentStep]) {
      return null;
    }
    return (
      <div>
        <Helmet>
          <title>กรู๊ดส์ survey</title>
          <meta name="description" content="กรู๊ดส์ survey" />
        </Helmet>
        <Switch>
          {steps.map((step) =>
            <PropsRoute key={step.questionType} path={`/${step.questionType}`} component={step.component} questionType={step.questionType} onComplete={this.handleOnComplete} label={questions[step.questionType] ? questions[step.questionType].text : step.label} islands={islands} />
          )}
        </Switch>
      </div>
    );
  }
}

Survey.propTypes = {
  location: PropTypes.object.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  onSubmitGPS: PropTypes.func.isRequired,
  dispatchLoadQuestions: PropTypes.func.isRequired,
  dispatchLoadIslands: PropTypes.func.isRequired,
  dispatchSetUserId: PropTypes.func.isRequired,
  questions: PropTypes.object,
  islands: PropTypes.array,
};

const mapStateToProps = createSelector(
  selectSurveyQuestions(),
  selectSurveyIslands(),
  (questions, islands) => ({
    questions,
    islands,
  })
);

const withConnect = connect(mapStateToProps, {
  onSubmitAnswer: submitAnswer,
  dispatchLoadQuestions: loadQuestions,
  dispatchLoadIslands: loadIslands,
  dispatchSetUserId: setUserId,
  onSubmitGPS: submitGPS,
});
const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'survey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Survey);
