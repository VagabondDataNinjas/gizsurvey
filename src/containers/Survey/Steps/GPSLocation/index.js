import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getGeolocation } from 'utils/geolocation';
import {
  Segment, Loader, Dimmer,
} from 'semantic-ui-react';

class Geolocation extends Component {
  componentWillMount() {
    if (navigator.geolocation) {
      getGeolocation()
      .then((pos) => {
        this.props.onComplete(pos);
      })
      .catch((err) => {
        this.props.onError(err);
      });
    }
  }

  render() {
    return (
      <Segment>
        <Dimmer active>
          <Loader indeterminate size="big">Finding your location</Loader>
        </Dimmer>
      </Segment>
    );
  }
}

Geolocation.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default Geolocation;
