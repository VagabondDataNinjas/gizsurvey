/**
 *
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import GPSLocation from './Steps/GPSLocation/Loadable';
import SocialPosition from './Steps/SocialPosition/Loadable';
import Price from './Steps/Price/Loadable';
import LineID from './Steps/LineID/Loadable';
import IslandName from './Steps/IslandName/Loadable';
import End from './Steps/End/Loadable';

import makeSelectSurvey from './selectors';
import reducer from './reducer';
import saga from './saga';


class Survey extends React.PureComponent {
  constructor() {
    super();
    this.handleOnComplete = this.handleOnComplete.bind(this);
    this.state = {
      currentStep: steps[0].type,
    };
  }

  componentWillMount() {
    // @todo call endpoint
  }

  getNextStep(type) {
    let nextStep = null;
    steps.forEach((step, i) => {
      if (step.type === type) {
        nextStep = steps[i + 1].type;
      }
    });
    return nextStep;
  }

  handleOnComplete(type, answer) {
    // @todo call endpoint
    console.log(answer);
    const nextStep = this.getNextStep(type);
    this.setState({
      currentStep: nextStep,
    });
  }

  render() {
    const { location: { pathname } } = this.props;
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
            <PropsRoute key={step.type} path={`/${step.type}`} component={step.component} type={step.type} onComplete={this.handleOnComplete} label={stepsData[step.type] ? stepsData[step.type].text : step.label} />
          )}
        </Switch>
      </div>
    );
  }
}

Survey.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  survey: makeSelectSurvey(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'survey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Survey);


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};
const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => renderMergedProps(component, routeProps, rest)}
  />
);
PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
};


const steps = [
  { type: 'job', component: SocialPosition },
  { type: 'lineid', component: LineID },
  { type: 'gps', component: GPSLocation, label: 'Finding your location' },
  { type: 'island', component: IslandName },
  { type: 'price', component: Price },
  { type: 'thank_you', component: End },
];


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
