import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header, Button,
} from 'semantic-ui-react';

const End = ({ label }) => (
  <Segment style={{ height: '100vh' }} className="center aligned">
    <Header>
      {label}
      <Button href="https://line.me/R/ti/p/%40npx1579f">Click here to finish</Button>
    </Header>
  </Segment>
);

End.propTypes = {
  label: PropTypes.string.isRequired,
};

export default End;
