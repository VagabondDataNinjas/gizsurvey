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
import GPSLocation from './Steps/GPSLocation/Loadable';
import SocialPosition from './Steps/SocialPosition/Loadable';
import Price from './Steps/Price/Loadable';
import LineID from './Steps/LineID/Loadable';
import IslandName from './Steps/IslandName/Loadable';
import End from './Steps/End/Loadable';

import {
  loadQuestions,
  submitAnswer,
  setUserId,
} from './actions';
import { selectSurveyUserId } from './selectors';
import reducer from './reducer';
import saga from './saga';

const steps = [
  { questionType: 'job', component: SocialPosition },
  { questionType: 'lineid', component: LineID },
  { questionType: 'gps', component: GPSLocation, label: 'Finding your location' },
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
    const { location, dispatchLoadQuestions, dispatchSetUserId } = this.props;
    const query = queryString.parse(location.search);
    dispatchSetUserId(query.uid ? query.uid : '');
    dispatchLoadQuestions();
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
    const { onSubmitAnswer } = this.props;
    onSubmitAnswer(questionType, answer);
    const nextStep = this.getNextStep(questionType);
    this.setState({
      currentStep: nextStep,
    });
  }

  render() {
    const { userId, location: { pathname } } = this.props;
    if (!userId.length) {
      return null;
    }
    const { currentStep } = this.state;
    if (pathname !== `/${currentStep}`) {
      return <Redirect to={`/${currentStep}`} />;
    }
    return (
      <div>
        <Helmet>
          <title>Survey</title>
          <meta name="description" content="GIZ Survey" />
        </Helmet>
        <Switch>
          {steps.map((step) =>
            <PropsRoute key={step.questionType} path={`/${step.questionType}`} component={step.component} questionType={step.questionType} onComplete={this.handleOnComplete} label={stepsData[step.questionType] ? stepsData[step.questionType].text : step.label} />
          )}
        </Switch>
      </div>
    );
  }
}

Survey.propTypes = {
  location: PropTypes.object.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  dispatchLoadQuestions: PropTypes.func.isRequired,
  dispatchSetUserId: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = createSelector(
  selectSurveyUserId(),
  (userId) => ({
    userId,
  })
);

const withConnect = connect(mapStateToProps, {
  onSubmitAnswer: submitAnswer,
  dispatchLoadQuestions: loadQuestions,
  dispatchSetUserId: setUserId,
});
const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'survey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Survey);

const stepsData = {
  job: {
    text: 'What is your occupation?',
    weight: '-7',
  },
  lineid: {
    text: 'What is your line id?',
    weight: '-6',
  },
  price: {
    text: 'How much do you pay for diesel in your area?',
    weight: '-9',
  },
  thank_you: {
    text: 'Thank you for all your help! We might ask you more questions in the future',
    weight: '-5',
  },
  welcome: {
    text: 'Thank you for following us!\nIf you\'d like to complete the survey online please go to https://google.com\nOtherwise you can complete the form here.\nYou can start by replying back with your location (area or island name)',
    weight: '-10',
  },
};
