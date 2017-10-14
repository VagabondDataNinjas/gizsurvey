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

import {
  Container, Segment, Header,
  Input, Label, List, Button, Icon, Loader, Dimmer, Image, Divider,
} from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSurvey from './selectors';
import reducer from './reducer';
import saga from './saga';
import map from '../../images/map.jpg';


export class Survey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Survey</title>
          <meta name="description" content="GIZ Survey" />
        </Helmet>
        <Container>
          <MessageGeoLocalisation />
          <Divider horizontal>then</Divider>
          <ListExampleFloated />
          <Divider horizontal>Saving</Divider>
          <ListExampleFloatedLoading />
          <Divider horizontal>finally</Divider>
          <StepLayoutPrice />
        </Container>

      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
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


const StepLayoutPrice = () => (
  <div>
    <Segment>
      <Divider horizontal>
      How much do you pay for 1 liter?
      </Divider>
      <Input labelPosition="right" type="number" placeholder="Amount">
        <Label basic>฿</Label>
        <input />
        <Label> / liter</Label>
      </Input>
      <Divider />
      <Button positive fluid>Submit</Button>
    </Segment>
    <Segment>
      <Input labelPosition="right" type="number" placeholder="Amount" disabled>
        <Label basic>฿</Label>
        <input value={32} />
        <Label> / liter</Label>
      </Input>
      <Divider />
      <Button positive loading fluid disabled>Submit</Button>
    </Segment>
    <Divider />
  </div>
);


const ListExampleFloated = () => (
  <Segment>
    <Header>
      <Icon name="map signs" />Select your island
    </Header>
    <Input fluid placeholder="Search the name of the island" icon="search" />
    <Divider />
    <Input fluid loading placeholder="Search the name of the island" />
    <Segment>
      <List divided verticalAlign="middle">
        <List.Item>
          <List.Content>
            <Button fluid>Ko chang</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi noi</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi mak</Button>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
    <Segment loading>
      <List divided verticalAlign="middle">
        <List.Item>
          <List.Content>
            <Button fluid>Ko chang</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi noi</Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <Button fluid>Ko noi mak</Button>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  </Segment>
);

const ListExampleFloatedLoading = () => (
  <Segment>
    <Dimmer active>
      <Loader indeterminate size="big">Saving</Loader>
    </Dimmer>
    <Header>
      <Icon name="map signs" />Select an island
    </Header>
    <Input fluid placeholder="Search the name of the island" icon="search" />
    <Divider />
    <Input fluid loading placeholder="Search the name of the island" />
    <List divided verticalAlign="middle">
      <List.Item>
        <List.Content>
          <Button fluid>Ko chang</Button>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <Button fluid>Ko noi</Button>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <Button fluid>Ko noi noi</Button>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <Button fluid>Ko noi mak</Button>
        </List.Content>
      </List.Item>
    </List>
  </Segment>
);

const MessageGeoLocalisation = () => (
  <Segment>
    <Dimmer active>
      <Loader indeterminate size="big">Finding your location</Loader>
    </Dimmer>
    <Image src={map} size="full" />
  </Segment>
);
