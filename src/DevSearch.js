import React from 'react';
import { Form, Input, Checkbox } from 'semantic-ui-react'

class DevSearch extends React.Component {
  
  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            fluid
            icon='search'
            iconPosition='left'
            placeholder='Search …'
            loading={ this.props.searching }
            onChange={ (event, data) => this.props.startSearch(data.value) }
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
    );
  }
  
}

export default DevSearch;