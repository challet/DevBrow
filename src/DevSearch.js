import React from 'react';
import { Form, Divider, Input, Checkbox } from 'semantic-ui-react';
import DevList from './DevList';
import onlineFetch from './data/onlineFetch';
import offlineFetch from './data/offlineFetch';

const KEY_TYPE_DELAY = 250;

class DevSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      current_search: '',
      users: []
    };
    // used in requestSearch function
    this.search_timer = null;
    // used in performSearch function
    this.abort_control = new AbortController();
  }
  
  componentDidMount() {
    if (!this.abort_control.signal.aborted) {
      this.performSearch();
    }
  }
  
  componentDidUpdate(prevProps) {
    // load more data when the user has changed
    if (this.props.online !== prevProps.online) {
      this.setState({ searching: true });
      this.performSearch();
    }
  }
  
  componentWillUnmount() {
    clearTimeout(this.search_timer);
    this.abort_control.abort();
  }
  
  /*
   * Request a search
   * it uses a small delay in order not to fire a useless search
   * in case a new search will be requested soon
   * for instance between two key press when a word is being typed
   */
  requestSearch(query) {
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
    }, KEY_TYPE_DELAY);
    
    // still update the state
    this.setState({
      searching: true,
      current_search: query
    });
  }
  
  /*
   *  Perform an async search and update the state
   */
  performSearch() {
    // abort previous fetch and set a new controller
    this.abort_control.abort();
    this.abort_control = new AbortController();
    // fetch data
    (this.props.online ? onlineFetch : offlineFetch).searchUser(this.state.current_search, this.abort_control.signal)
      .then( (users) => {
        if (users) {
          this.setState({
            users: users.items,
            searching: false
          });
        }
      })
      .catch( (e) => {
        this.setState({
          users: [],
          searching: false
        });
        console.error(e);
        // TODO: notifiy the user
      });
  }
  
  render() {
    return (
      <div>
        <Form>
          <Form.Field error={ !this.state.searching && this.state.current_search !== '' && this.state.users.length === 0 }>
            <Input
              fluid
              icon='search'
              iconPosition='left'
              placeholder='Search …'
              loading={ this.state.searching }
              onChange={ (event, data) => this.requestSearch(data.value) }
            />
          </Form.Field>
          <Form.Field>
            <Checkbox 
              toggle
              checked={ this.props.online }
              label="Online mode" 
              onClick={ () => this.props.setOnlineMode(!this.props.online) }
            />
          </Form.Field>
        </Form>
        <Divider />
        <DevList 
          users={ this.state.users }
          selected={ this.props.selected }
          selectUser={ this.props.selectUser }
          online={ this.props.online }
          searching={ this.state.searching }
        />
      </div>
    );
  }
  
}

export default DevSearch;