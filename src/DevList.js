import React from 'react';
import { Segment, List, Image } from 'semantic-ui-react';
import DevSearch from './DevSearch'

function DevList() {
  return (
    <Segment>
      <DevSearch />
      <List animated verticalAlign='middle'>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
}

export default DevList;
