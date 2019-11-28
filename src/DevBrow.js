import React from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import DevSearch from './DevSearch';
import DevDetails from './DevDetails';
import 'semantic-ui-css/semantic.min.css';
import './tweak.css';

class DevBrow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayed_user: null
    };
  }
  
  selectUser(user) {
    this.setState({
      displayed_user: user
    });
  }
  
  render() {
    return (
      <Container as="section">
        <Grid stackable padded columns={2}>

          <Grid.Column width={5} as="aside" className="list-container">
            <Header as="h2" textAlign="center">
              <Icon name="list" />Users list
            </Header>
            <DevSearch selected={ this.state.displayed_user } selectUser={ this.selectUser.bind(this) } />
          </Grid.Column>

          <Grid.Column width={11} as="article" className="details-container">
            <Header as="h2" textAlign="center">
              <Icon name="user" />User details
            </Header>
            <DevDetails user={ this.state.displayed_user } />
          </Grid.Column>

        </Grid>
      </Container>
    );
  }

}

export default DevBrow;
