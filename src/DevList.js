import React from 'react';
import { Segment, List, Image, Divider } from 'semantic-ui-react';
import DevSearch from './DevSearch';

function DevList() {
  return (
    <Segment>
      <DevSearch />
      <Divider />
      <List animated selection as="ul" verticalAlign='middle'>
        <List.Item as="li" className="item">
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item link as="li" className="item">
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <List.Content as="a">
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item link as="li" className="item">
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
          <List.Content as="a">
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
}

export default DevList;
