import React from 'react';
import { Container, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import DevSearch from './DevSearch';
import DevDetails from './DevDetails';
import 'semantic-ui-css/semantic.min.css';
import './tweak.css';

class DevBrow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayed_user: null,
      online: false
    };
  }
  
  selectUser(user) {
    this.setState({
      displayed_user: user
    });
  }
  
  setOnlineMode(online) {
    this.setState({ online });
  }
  
  render() {
    return (
      <Container as="section" className="browser-container">
        <Grid stackable padded columns={2}>

          <Grid.Column width={5} as="aside" className="list-container">
            <Header as="h2" textAlign="center" attached="top">
              <Icon name="list" />Users list
            </Header>
            <Segment attached>
              <DevSearch 
                selected={ this.state.displayed_user }
                selectUser={ this.selectUser.bind(this) }
                online={ this.state.online }
                setOnlineMode={ this.setOnlineMode.bind(this) }
              />
            </Segment>
          </Grid.Column>

          <Grid.Column width={11} as="article" className="details-container">
            <Header as="h2" textAlign="center" attached="top">
              <Icon name="user" />User details
            </Header>
            <Segment attached>
              <DevDetails 
                user={ this.state.displayed_user }
                online={ this.state.online }
              />
            </Segment>
          </Grid.Column>

        </Grid>
      </Container>
    );
  }

}

export default DevBrow;
