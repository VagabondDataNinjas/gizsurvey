import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header,
} from 'semantic-ui-react';

const End = ({ label }) => (
  <Segment style={{ height: '100vh' }} className="center aligned">
    <Header>
      {label}
    </Header>
  </Segment>
);

End.propTypes = {
  label: PropTypes.string.isRequired,
};

export default End;
