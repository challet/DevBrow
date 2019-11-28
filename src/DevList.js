import React from 'react';
import { Segment, List, Image, Divider } from 'semantic-ui-react';
import DevSearch from './DevSearch';
import offlineUsers from './data/users.json';

class DevList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      searching: false,
      users: offlineUsers.items
    };
    this.search_timer = null;
  }
  
  setOnlineMode(online) {
    this.setState({
      online,
      users: online ? [] : offlineUsers.items
    });
  }
  
  /*
   * Perform a search
   * it uses a small delay in order not to fire a useless search
   * in case a new search will be requested soon
   * for instance between two key press when a word is being typed
   *
   */
  startSearch(query) {
    // cancel a previous delay
    if (this.search_timer !== null) {
      clearTimeout(this.search_timer);
    }
    // set a delay
    this.search_timer = setTimeout(() => {
      // reset a delay having been reached
      this.search_timer = null;
      // actually perform the search
      this.state.online ? this.onlineSearch(query) : this.offlineSearch(query);
    }, 100);
    
    this.setState({
      searching: true
    });
  }
  
  offlineSearch(query) {
    this.setState({
      users: offlineUsers.items.filter((user) => user.login.indexOf(query) !== -1),
      searching: false
    });
  }
  
  onlineSearch(query) {
    
  }
  
  renderUser(user) {
    return (
      <List.Item
        as="li"
        className="item"
        key={ user.id }
        onClick={ () => this.props.selectUser(user.id) }
        active={ user.id === this.props.selected }
      >
        <Image avatar src={ user.avatar_url } />
        <List.Content>
          <List.Header>{ user.login }</List.Header>
        </List.Content>
      </List.Item>
    );
  }
  
  render() {
    return (
      <Segment>
        <DevSearch 
          online={ this.state.online }
          searching={ this.state.searching }
          setOnlineMode={ this.setOnlineMode.bind(this) }
          startSearch={ this.startSearch.bind(this) }
        />
        <Divider />
        <List animated selection as="ul" verticalAlign='middle'>
          { this.state.users.map(this.renderUser.bind(this)) }
        </List>
      </Segment>
    );
  }

}

export default DevList;