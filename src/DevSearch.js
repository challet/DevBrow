import React from 'react';
import { Form, Segment, Divider, Input, Checkbox } from 'semantic-ui-react'
import DevList from './DevList';
import offlineUsers from './data/users.json';

class DevSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      searching: false,
      current_search: '',
      users: offlineUsers.items
    };
    this.search_timer = null;
  }
  
  setOnlineMode(online) {
    this.setState({
      online,
    });
    this.performSearch();
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
      this.performSearch();
    }, 100);
    
    this.setState({
      searching: true,
      current_search: query
    });
  }
  
  /*
   *  Perform a search by routing what method to use (online/offline)
   */
  performSearch() {
    if (this.state.online) {
      this.onlineSearch();
    } else {
      this.offlineSearch();
    }
  }
  
  /*
   *  Search users from a local json file
   *  No search query : display them all
   */
  offlineSearch() {
    let users;
    if (this.state.current_search) {
      users = offlineUsers.items.filter((user) => user.login.indexOf(this.state.current_search) !== -1);
    } else {
      users = offlineUsers
    }
    this.setState({
      users,
      searching: false
    });
  }
  
  /*
   *  Search users from a local json file
   *  No search query : display none
   */
  onlineSearch() {
    // flush results
    this.setState({ users: [] });
    if (!this.state.current_search) {
      // nothing more to do here
      this.setState({ searching: false });
    } else {
      // TODO
    }
  }
  
  render() {
    return (
      <Segment>
        <Form>
          <Form.Field error={ !this.state.searching && this.state.current_search && this.state.users.length === 0 }>
            <Input
              fluid
              icon='search'
              iconPosition='left'
              placeholder='Search …'
              loading={ this.state.searching }
              onChange={ (event, data) => this.startSearch(data.value) }
            />
          </Form.Field>
          <Form.Field>
            <Checkbox 
              toggle
              checked={ this.props.online }
              label="Online mode" 
              onClick={ () => this.setOnlineMode(!this.state.online) }
            />
          </Form.Field>
        </Form>
        <Divider />
        <DevList 
          users={ this.state.users }
          selected={ this.props.selected }
          selectUser={ this.props.selectUser }
          online={ this.state.online }
        />
      </Segment>
    );
  }
  
}

export default DevSearch;