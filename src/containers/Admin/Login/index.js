/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'semantic-ui-react';
import { submitLogin } from '../actions';

class Login extends Component {
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
      <div style={{ height: '80vh', width: '500px', margin:'20px auto', position: 'relative' }} className="center aligned">
        <Form>
          <Form.Field>
            <label>Login</label>
            <Input
              placeholder="Username"
              onChange={({ currentTarget: { value }}) => this.setState({ username: value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Password"
              onChange={({ currentTarget: { value }}) => this.setState({ password: value })}
            />
          </Form.Field>
          <Button
            onClick={() => this.props.dispatch(submitLogin(this.state.username, this.state.password))}
            primary
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const withConnect = connect();

export default withConnect(Login);