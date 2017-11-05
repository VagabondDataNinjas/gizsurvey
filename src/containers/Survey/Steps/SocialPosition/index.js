import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Segment, List, Icon, Header, Button,
} from 'semantic-ui-react';

class SocialPosition extends PureComponent {
  render() {
    const { onComplete, questionType, label } = this.props;
    return (
      <Segment>
        <Header>
          <Icon name="map signs" />{label}
        </Header>
        <Segment>
          <List divided verticalAlign="middle">
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'community leader')} fluid>community leader</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'shop owner')} fluid>shop owner</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'diesel distributor')} fluid>diesel distributor</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'villager')} fluid>villager</Button>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Segment>
    );
  }
}

SocialPosition.propTypes = {
  onComplete: PropTypes.func.isRequired,
  questionType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SocialPosition;
