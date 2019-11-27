import React from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import DevList from './DevList';
import DevDetails from './DevDetails';
import 'semantic-ui-css/semantic.min.css';
import './tweak.css';

function DevBrow() {
  return (
    <Container as="section">
      <Grid stackable padded columns="2">

        <Grid.Column width={5} as="aside" className="list-container">
          <Header as="h2" textAlign="center">
            <Icon name="list" />Users list
          </Header>
          <DevList />
        </Grid.Column>

        <Grid.Column width={11} as="article" className="details-container">
          <Header as="h2" textAlign="center">
            <Icon name="user" />User details
          </Header>
          <DevDetails />
        </Grid.Column>

      </Grid>
    </Container>
  );
}

export default DevBrow;
