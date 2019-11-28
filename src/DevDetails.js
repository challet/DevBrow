import React from 'react';
import { Segment, Header, Image, Divider, Message, Icon } from 'semantic-ui-react';
import DevRepositories from './DevRepositories';

class DevDetails extends React.Component {
  
  render() {
    if (this.props.user === null) {
      return (
        <Segment>
        <Message
          icon="question"
          header="No user to display"
          content="Please search for and select a user"
        />
        </Segment>
      )
    } else {
      return (
        <Segment>
          <Image 
            src={ this.props.user.avatar_url }
            bordered
            size="small"
            verticalAlign="top"
            floated="left"
          />
          <Header as="h1">
            <Header.Content>{ this.props.user.login }</Header.Content>
            <a href={ this.props.user.html_url } target="_blank">
              <Icon link name="external" size="tiny" />
            </a>
          </Header>
          <Divider clearing />
          <Header as="h3">Repositories</Header>
          <DevRepositories />
        </Segment>
      );
    }
  }

}

export default DevDetails;