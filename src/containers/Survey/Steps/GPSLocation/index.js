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
        this.props.onComplete(this.props.type, pos);
      })
      .catch((err) => {
        this.props.onComplete(this.props.type, err);
      });
    }
  }

  render() {
    const { label } = this.props;
    return (
      <Segment style={{ height: '100vh' }}>
        <Dimmer active>
          <Loader indeterminate size="big">{label}</Loader>
        </Dimmer>
      </Segment>
    );
  }
}

Geolocation.propTypes = {
  onComplete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Geolocation;
