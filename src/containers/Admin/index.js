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


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// import {} from './actions';
// import { selectAdminDomain } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Map from './Map/Loadable';

class Admin extends React.PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    // const { location } = this.props;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>GIZ Administration</title>
          <meta name="description" content="GIZ Administration" />
        </Helmet>
        <Switch>
          <Route path="/admin" component={Map} />
        </Switch>
      </div>
    );
  }
}

Admin.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createSelector(
  () => {},
  (admin) => ({
    admin,
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
