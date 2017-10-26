import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header, Input, Divider, Button, Label,
} from 'semantic-ui-react';

class Price extends Component {
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      price: '',
    };
  }

  handleOnChange({ currentTarget: { value } }) {
    this.setState({
      price: value,
    });
  }

  render() {
    const { onComplete, questionType, label } = this.props;
    const { price } = this.state;
    return (
      <Segment className="center aligned">
        <Header>{label}</Header>
        <Input labelPosition="right" type="number" placeholder="Amount" value={price} onChange={this.handleOnChange}>
          <Label basic>฿</Label>
          <input />
          <Label> / liter</Label>
        </Input>
        <Divider />
        <Button disabled={price.length < 2} onClick={() => onComplete(questionType, price)} positive fluid>Submit</Button>
      </Segment>
    );
  }
}

Price.propTypes = {
  onComplete: PropTypes.func.isRequired,
  questionType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Price;
