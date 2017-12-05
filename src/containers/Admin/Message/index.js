/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react'

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }


  render() {
    const { center, popup, zoom, items } = this.state;
    return (
      <div style={{ height: '100vh', width: '100vw', position: 'relative' }} className="center aligned">

      </div>
    );
  }
}

Message.propTypes = {
};

const withConnect = connect();

export default withConnect(Message);
