import React from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import DevList from './DevList';
import 'semantic-ui-css/semantic.min.css';

function DevBrow() {
  return (
    <Container as="section">
      <Grid stackable padded columns="2">

        <Grid.Column width="5" as="aside">
          <Header as="h2" textAlign="center">
            <Icon name="list" />Users list
          </Header>
          <DevList />
        </Grid.Column>

        <Grid.Column width="11" as="article">
          <Header as="h2" textAlign="center">
            <Icon name="user" />User details
          </Header>
          details
          {/*<UserDetails />*/}
        </Grid.Column>

      </Grid>
    </Container>
  );
}

export default DevBrow;
