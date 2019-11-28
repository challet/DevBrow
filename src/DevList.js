import React from 'react';
import { List, Image, Message } from 'semantic-ui-react';


class DevList extends React.Component {
    
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
    if (this.props.users.length) {
      return (
        <List animated selection as="ul" verticalAlign='middle'>
          { this.props.users.map(this.renderUser.bind(this)) }
        </List>
      );
    } else {
      let content = 'Please try a different search query' + (this.props.online ? '' : ' or go online');
      return (
        <Message
         icon='id card outline'
         header='Empty users list'
        content={ content }
        />
      )
    }
  }

}

export default DevList;