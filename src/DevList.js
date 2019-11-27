import React from 'react';
import { Segment, List, Image, Divider } from 'semantic-ui-react';
import DevSearch from './DevSearch';
import offlineUsers from './data/users.json';

class DevList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      users: offlineUsers.items
    };
  }
  
  setOnlineMode(online) {
    this.setState({
      online,
      users: online ? [] : offlineUsers.items
    });
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
          setOnlineMode={ this.setOnlineMode.bind(this) }
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