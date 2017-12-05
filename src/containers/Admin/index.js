/**
 *
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';

import { Menu, Loader, Dimmer } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// import {} from './actions';
import {
  selectAdminAccess,
  selectLoading,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Map from './Map/Loadable';
import Message from './Message/Loadable';
import Login from './Login/Loadable';

class Admin extends React.PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    // const { location } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.access && !nextProps.access) {
      nextProps.history.push('/admin/login');
    }
  }

  render() {
    const { activeItem, loading } = this.props;
    return (
      <div>
        <Helmet>
          <title>GIZ Administration</title>
          <meta name="description" content="GIZ Administration" />
        </Helmet>
        <Menu>
          <Menu.Item
            name="map"
            active={activeItem === 'map'}
            onClick={() => this.props.history.push('/admin/map')}
          >Map</Menu.Item>
          <Menu.Item
            name="message"
            active={activeItem === 'message'}
            onClick={() => this.props.history.push('/admin/message')}
          >Message</Menu.Item>
          <Menu.Item
            name="message"
            active={activeItem === 'message'}
          >
            <a download="data.csv" href="/api/admin/download/data.csv">download data.csv</a>
          </Menu.Item>
          <Menu.Item
            name="message"
            active={activeItem === 'message'}
          >
            <a download="line-events.csv" href="/api/admin/download/lineevents.csv">download line-events.csv</a>
          </Menu.Item>
        </Menu>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Switch>
          <Route path="/admin/map" component={Map} />
          <Route path="/admin/message" component={Message} />
          <Route path="/admin/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.object,
  activeItem: PropTypes.string,
  access: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createSelector(
  selectAdminAccess(),
  selectLoading(),
  (access, loading) => ({
    access,
    loading,
  })
);

const withConnect = connect(mapStateToProps, {
});
const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
