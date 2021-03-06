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
                <Button onClick={() => onComplete(questionType, 'community leader')} fluid>ผู้นำชุมชน</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'shop owner')} fluid>เจ้าของร้านค้า</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'diesel distributor')} fluid>คนซื้อน้ำมันจากฝั่งและนำมาขายต่อบนเกาะ</Button>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button onClick={() => onComplete(questionType, 'villager')} fluid>ชาวบ้านทั่วไป</Button>
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
