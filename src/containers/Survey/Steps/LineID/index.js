import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header, Input, Divider, Button,
} from 'semantic-ui-react';

class LineID extends Component {
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      lineID: '',
    };
  }

  handleOnChange({ currentTarget: { value } }) {
    this.setState({
      lineID: value,
    });
  }

  render() {
    const { onComplete, type, label } = this.props;
    const { lineID } = this.state;
    return (
      <Segment className="center aligned">
        <Header>{label}</Header>
        <Input type="text" placeholder="line ID" value={lineID} onChange={this.handleOnChange} />
        <Divider />
        <Button disabled={lineID.length < 2} onClick={() => onComplete(type, lineID)} positive fluid>Submit</Button>
      </Segment>
    );
  }
}

LineID.propTypes = {
  onComplete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LineID;
