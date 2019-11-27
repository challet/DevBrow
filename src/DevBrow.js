import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function DevBrow() {
  return (
    <Grid celled stackable columns="2">

      <Grid.Column width="5">
        <Header as="h2">
          <Icon name="list" size="tiny" />
          <Header.Content>Users list</Header.Content>
        </Header>
        list
        {/*<UserList />*/}
      </Grid.Column>

      <Grid.Column width="11">
        <Header as="h2">
          <Icon name="user" size="tiny" />
          <Header.Content>Users details</Header.Content>
        </Header>
        details
        {/*<UserDetails />*/}
      </Grid.Column>

    </Grid>
  );
}

export default DevBrow;
