import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react';

import { sendQuestion } from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      reply: '',
    };
  }

  render() {
    const { question, reply } = this.state;
    return (
      <div style={{ height: '100vh', width: '100vw', position: 'relative' }} className="center aligned">
        <Form>
          <Form.Field>
            <TextArea
              autoHeight
              placeholder="Question"
              onChange={({ currentTarget: { value } }) => this.setState({ question: value })}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              autoHeight
              placeholder="Reply"
              onChange={({ currentTarget: { value } }) => this.setState({ reply: value })}
            />
          </Form.Field>
          <Button
            onClick={() => { this.props.dispatch(sendQuestion(question, reply)); this.setState({ question: '', reply: '' }); }}
            primary
          >
            Send message
          </Button>
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
