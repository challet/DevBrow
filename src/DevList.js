import React from 'react';
import { List, Image, Message, Placeholder } from 'semantic-ui-react';


class DevList extends React.Component {
    
  renderUser(user) {
    return (
      <List.Item
        as="li"
        className="item"
        key={ user.id }
        onClick={ () => this.props.selectUser(user) }
        active={ this.props.selected !== null && this.props.selected.id === user.id }
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
      // display users
      return (
        <List animated selection as="ol" verticalAlign='middle' size="small">
          { this.props.users.map(this.renderUser.bind(this)) }
        </List>
      );
    } else if (this.props.searching) {
      // display temporary content
      // TODO : replace with a loader or a placeholder
      return null;
    } else {
      // no user to display
      let content = 'Please try a different search query' + (this.props.online ? '' : ' or go online');
      return (
        <Message
          icon='id card outline'
          header='Empty users list'
          content={ content }
        />
      );
    }
  }

}

export default DevList;