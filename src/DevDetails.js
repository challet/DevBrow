import React from 'react';
import { Header, Image, Divider, Message } from 'semantic-ui-react';
import DevRepositories from './DevRepositories';
import onlineFetch from './data/onlineFetch';
import offlineFetch from './data/offlineFetch';

class DevDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      loading: false
    };
    // used in fetchDetails function
    this.abort_control = new AbortController();
  }
  
  componentDidUpdate(prevProps) {
    // load more data when the user has changed
    if (this.props.user !== prevProps.user) {
      this.fetchDetails();
    }
  }
  
  fetchDetails() {
    // abort the previous fetch, set a new controller and keep a local reference
    this.abort_control.abort();
    const abort_control = new AbortController();
    this.abort_control = abort_control;
    // fetch data
    (this.props.online ? onlineFetch : offlineFetch).getRepositories(this.props.user, abort_control.signal)
      .then( (repositories) => {
        if (!abort_control.signal.aborted) {
          this.setState({ repositories, loading: false });
        }
      })
      .catch( (e) => {
        // if not aborted (code 20 is AbortError)
        if (!(e instanceof DOMException) || e.code !== 20) {
          this.setState({ repositories: [], loading: false });
          // TODO: notifiy the user
        }
        console.error(e);
      });
      
    this.setState({ repositories: [], loading: true });
  }
  
  render() {
    if (this.props.user === null) {
      return (
        <Message
          icon="question"
          header="No user to display"
          content="Please search for and select a user"
        />
      )
    } else {
      return (
        <div>
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
          <DevRepositories repositories={ this.state.repositories } loading={ this.state.loading }/>
        </div>
      );
    }
  }

}

export default DevDetails;