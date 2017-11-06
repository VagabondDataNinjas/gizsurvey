import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header, Button,
} from 'semantic-ui-react';

const End = () => (
  <Segment style={{ height: '100vh' }} className="center aligned">
    <Header>
      <p>ขอบคุณที่ส่งข้อมูลให้เรา</p>
      <Button href="https://line.me/R/ti/p/%40npx1579f">เช็คราคาจากเกาะใกล้เคียง</Button>
    </Header>
  </Segment>
);

End.propTypes = {
  label: PropTypes.string.isRequired,
};

export default End;
