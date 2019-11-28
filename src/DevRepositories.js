import React from 'react';
import { Card, Label, List, Icon } from 'semantic-ui-react';

class DevRepositories extends React.Component {

  renderLabels(repo) {
    if (!repo.license && !repo.watchers_count && !repo.stargazers_count && !repo.forks_count) {
      return null;
    } else {
      let watchers, stars, forks, license;
    
      if (repo.license !== null) {
        license = <Label>
          <Icon name="book" />License 
          <Label.Detail>{ repo.license.spdx_id }</Label.Detail>
        </Label>;
      }
    
      if (repo.watchers_count != 0) {
        watchers = <Label>
          <Icon name="eye" />Watchers
          <Label.Detail>{ repo.watchers_count }</Label.Detail>
        </Label>;
      }
    
      if (repo.stargazers_count != 0) {
        stars = <Label>
          <Icon name="star" />Stars 
          <Label.Detail>{ repo.stargazers_count }</Label.Detail>
        </Label>;
      }
    
      if (repo.forks_count != 0 || !repo.fork) {
        forks = <Label>
          <Icon name="fork" color={ repo.fork ? null : "yellow" }/>Forks 
          <Label.Detail>{ repo.forks_count }</Label.Detail>
        </Label>;
      }
    
      return (
        <Label.Group size="tiny">
          { license }
          { watchers }
          { stars }
          { forks }
        </Label.Group>
      );
    }
  }

  renderRepo(repo) {
    return (
      <List.Item key={repo.id}>
        <List.Content>
          <List.Header as="h4">
            { repo.name }
            <a href={ repo.html_url } target="_blank" rel="noopener noreferrer" >
              <Icon link name="external" size="small" />
            </a>
            { this.renderLabels(repo) }
          </List.Header>
          <List.Description>
            { repo.description }
          </List.Description>
        </List.Content>
      </List.Item>
    ); 
  }

  render() {
    if (this.props.repositories.length === 0) {
      return null;
    } else {
      return (
        <Card>
          <Card.Content>
            <Card.Header as="h3">
              <Label horizontal as="span">{ this.props.repositories.length }</Label>
              Repositories
            </Card.Header>
            <Card.Description>
              <List relaxed divided>
                { this.props.repositories.map(this.renderRepo.bind(this)) }
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    }
  }

}

export default DevRepositories;
