import React from 'react';
import { Segment, Header, Image, Divider } from 'semantic-ui-react';
import DevRepositories from './DevRepositories';

function DevDetails() {
  return (
    <Segment>
      <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" 
        bordered 
        size="small" 
        verticalAlign="top" 
        floated="left" 
      />
      <Header as="h3">Username</Header>
      <Divider clearing />
      <Header as="h4">Repositories</Header>
      <DevRepositories />
    </Segment>
  );
}

export default DevDetails;
