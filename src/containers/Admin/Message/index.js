import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Confirm } from 'semantic-ui-react';

import { sendQuestion } from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      reply: '',
      confirm: false,
    };
    this.onSubmit = () => { this.setState({ confirm: true }); };
    this.onCancel = () => { this.setState({ confirm: false }); };
    this.onConfirm = () => { this.props.dispatch(sendQuestion(this.state.question, this.state.reply)); this.setState({ question: '', reply: '', confirm: false }); };
  }

  render() {
    const { confirm } = this.state;
    return (
      <div style={{ margin: '20px auto', width: '600px', position: 'relative' }} className="center aligned">
        <Form>
          <Form.Field>
            <label htmlFor="question">Message text</label>
            <TextArea
              id="question"
              autoHeight
              placeholder="Question"
              onChange={({ currentTarget: { value } }) => this.setState({ question: value })}
            />
            <p>{'available variables: {{.DisplayName}} {{.Location}}'}</p>
          </Form.Field>
          <Form.Field>
            <label htmlFor="question">Reply text</label>
            <TextArea
              id="reply"
              autoHeight
              placeholder="Reply"
              onChange={({ currentTarget: { value } }) => this.setState({ reply: value })}
            />
            <p>{'available variables: {{.Location}} {{.PriceList}}'}</p>
          </Form.Field>
          <Button
            onClick={this.onSubmit}
            primary
          >
            Send message
          </Button>
          <Confirm
            open={confirm}
            cancelButton="Never mind"
            confirmButton="Let's send it"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        </Form>
      </div>
    );
  }
}

Message.propTypes = {
  dispatch: PropTypes.func,
};

const withConnect = connect();

export default withConnect(Message);
