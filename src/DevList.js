import React from 'react';
import { List, Image, Message, Dimmer, Loader } from 'semantic-ui-react';


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
    let content;
    if (this.props.users.length) {
      // display users
      content = (
        <List animated selection as="ol" verticalAlign='middle' size="small">
          { this.props.users.map(this.renderUser.bind(this)) }
        </List>
      );
    } else  {
      // no user to display
      let message = 'Please try a different search query' + (this.props.online ? '' : ' or go online');
      content =  (
        <Message
          icon='id card outline'
          header='Empty users list'
          content={ message }
        />
      );
    }
    return (
      <Dimmer.Dimmable as="div" dimmed={ this.props.searching }>
        <Dimmer inverted active={ this.props.searching }><Loader /></Dimmer>
        { content }
      </Dimmer.Dimmable>
    );
  }

}

export default DevList;