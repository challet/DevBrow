import React from 'react';
import { Card, Label, List } from 'semantic-ui-react';

function DevRepositories(props) {
  if (props.repositories.length === 0) {
    return null;
  } else {
    return (
      <Card>
        <Card.Content>
          <Card.Header as="h3">
            <Label horizontal as="span">{ props.repositories.length }</Label>
            Repositories
          </Card.Header>
          <Card.Description>
            <List divided>
              { props.repositories.map((repo) => {
                return (
                  <List.Item key={repo.id}>
                    { repo.name }
                  </List.Item>
                ); 
              })}
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default DevRepositories;
