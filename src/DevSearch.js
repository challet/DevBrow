import React from 'react';
import { Form, Input, Checkbox, Popup } from 'semantic-ui-react'

function DevSearch() {
  return (
    <Form>
      <Form.Field>
        <Input 
          fluid
          icon='search'
          iconPosition='left'
          placeholder='Search …'
        />
      </Form.Field>
      <Form.Field>
        <Checkbox toggle label="Online mode"/>
      </Form.Field>
    </Form>
  );
}

export default DevSearch;
