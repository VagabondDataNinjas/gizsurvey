import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Segment, Header, Input, Button, List, Icon,
} from 'semantic-ui-react';

class IslandName extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      search: '',
      filteredIslands: props.islands,
    };
  }

  handleOnChange({ currentTarget: { value } }) {
    const filteredIslands = this.props.islands.filter((island) => island.english.toLowerCase().includes(value.toLowerCase()) || island.thai.toLowerCase().includes(value.toLowerCase()));
    this.setState({
      search: value,
      filteredIslands,
    });
  }

  render() {
    const { onComplete, questionType, label } = this.props;
    const { search, filteredIslands } = this.state;
    return (
      <Segment className="center aligned">
        <Header>
          <Icon name="map signs" />{label}
        </Header>
        <Input fluid placeholder="Search the name of the island" icon="search" onChange={this.handleOnChange} value={search} />
        <Segment style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
          <List divided verticalAlign="middle">
            {filteredIslands.map((island) => (
              <List.Item key={island.english}>
                <List.Content>
                  <Button fluid onClick={() => onComplete(questionType, island.english)}>{island.thai} {island.thai ? '/' : null} {island.english}</Button>
                </List.Content>
              </List.Item>
            ))
            }
            {search.length > 2 ?
              <List.Item key={search}>
                <List.Content>
                  <Button fluid onClick={() => onComplete(questionType, search)}>{search}</Button>
                </List.Content>
              </List.Item>
            : null}
          </List>
        </Segment>
      </Segment>
    );
  }
}

IslandName.propTypes = {
  onComplete: PropTypes.func.isRequired,
  questionType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  islands: PropTypes.object.isRequired,
};

export default IslandName;
