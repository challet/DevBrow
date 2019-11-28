import React from 'react';
import { Segment, Header, Image, Divider, Message, Icon } from 'semantic-ui-react';
import DevRepositories from './DevRepositories';
import restData from './restData';

class DevDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      repositories: []
    };
  }
  
  componentDidUpdate(prevProps) {
    // load more data when the user has changed
    if (this.props.user !== prevProps.user) {
      this.fetchDetails();
    }
  }
  
  fetchDetails() {
    restData.getRepositories(this.props.user, this.props.online)
      .then((repositories) => {
        this.setState({
          repositories
        });
      });
  }
  
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
            <Header.Content>
              <a href={ this.props.user.html_url } target="_blank" rel="noopener noreferrer" >
                { this.props.user.login }
              </a>
            </Header.Content>
          </Header>
          <Divider clearing />
          <DevRepositories repositories={ this.state.repositories } />
        </Segment>
      );
    }
  }

}

export default DevDetails;