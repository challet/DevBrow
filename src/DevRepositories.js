import React from 'react';
import { Card, Header, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

class DevRepositories extends React.Component {

  renderLabels(repo) {
    let group = [];
    
    if (repo.language) {
      group.push(
        <Label image key="keyboard">
          <Icon name="keyboard" />Language 
          <Label.Detail>{ repo.language }</Label.Detail>
        </Label>
      );
    }
    
    if (repo.license !== null) {
      group.push( 
        <Label image key="book">
          <Icon name="book" />License 
          <Label.Detail>{ repo.license.spdx_id }</Label.Detail>
        </Label>
      );
    }
    
    if (repo.watchers_count !== 0) {
      group.push( 
        <Label image key="eye">
          <Icon name="eye" />Watchers
          <Label.Detail>{ repo.watchers_count }</Label.Detail>
        </Label>
      );
    }
  
    if (repo.stargazers_count !== 0) {
      group.push(
        <Label image key="star">
          <Icon name="star" />Stars 
          <Label.Detail>{ repo.stargazers_count }</Label.Detail>
        </Label>
      );
    }
  
    if (repo.forks_count !== 0) {
      group.push( 
        <Label image key="fork">
          <Icon name="fork" />Forks 
          <Label.Detail>{ repo.forks_count }</Label.Detail>
        </Label>
      );
    }
    
    // grouped labels
    if (group.length) {
      return (
        <Card.Content extra>
          <Label.Group size="tiny">
            { group }
          </Label.Group>
        </Card.Content>
      )
    } else {
      return null;
    }
  }

  renderRepo(repo) {
    const oc = !repo.fork ? <Label corner="right" size="mini"><Icon name="star" color="yellow" /></Label> : null;
    return (
      <Card as="li" key={ repo.id }>
        { oc }
        <Card.Content>
          <Card.Header as="h3">
            <a href={ repo.html_url } target="_blank" rel="noopener noreferrer" >
              { repo.name }
            </a>
          </Card.Header>
          <Card.Meta>
            <span className='date'>Since { moment(repo.created_at).format("MMMM YYYY") }</span>
          </Card.Meta>
          <Card.Description>
            { repo.description }
          </Card.Description>
        </Card.Content>
        { this.renderLabels(repo) }
      </Card>
    ); 
  }

  render() {
    if (this.props.repositories.length === 0) {
      return null;
    } else {
      return (
        <div>
          <Header as="h3">
            <Label horizontal as="span">{ this.props.repositories.length }</Label>
            Repositories
          </Header>
          <Card.Group as="ul" itemsPerRow={3}>
            { this.props.repositories.map(this.renderRepo.bind(this)) }
          </Card.Group>
        </div>
      );
    }
  }

}

export default DevRepositories;
