import React from 'react';
import { Container, Grid, Header, List, Menu, Sticky } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import intro from './intro.js';
import general from './general.js';
import conditions from './conditions.js';
import management from './management.js';
import account from './account.js';
import responsibility from './responsibility.js';
import compensation from './compensation.js';
import agreement from './agreement.js';

if (process.env.BROWSER) {
  require('./style.scss');
}

class UserTerms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'intro'};
    autoBind(this);
  }

  handleContextRef (contextRef) {
    this.setState({ contextRef });
  }

  handleItemClick (e, { name }) {
    this.setState({ activeItem: name });
  }

  renderList(section) {
    return section.map(item => <List.Item as='li'>{item}</List.Item>);
  }

  render() {
    const { contextRef, activeItem } = this.state;

    return (
      <div className="UserTerms" ref={this.handleContextRef}>
        <Grid columns={2} relaxed>
          <Grid.Column className="UserTerms-menu">
            <Menu pointing secondary vertical color="orange">
              <Menu.Item
                name='intro'
                active={activeItem === 'intro'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Termos Gerais'
                active={activeItem === 'Termos Gerais'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Condições de Uso'
                active={activeItem === 'Condições de Uso'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Cadastro e Gestão de Eventos'
                active={activeItem === 'Cadastro e Gestão de Eventos'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Política de Encerramento de Conta'
                active={activeItem === 'Política de Encerramento de Conta'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Limitação de Responsabilidade'
                active={activeItem === 'Limitação de Responsabilidade'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Indenização'
                active={activeItem === 'Indenização'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Consentimento'
                active={activeItem === 'Consentimento'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column className="UserTerms-text">
            <Container text>
              <div className="intro">
                <Header as="h1">Toakee - Termos de Uso</Header>
                <List>{this.renderList(intro)}</List>
              </div>
              <div className="general">
                <Header as="h2">Termos Gerais</Header>
                <List as='ol'>{this.renderList(general)}</List>
              </div>
              <div className="conditions">
                <Header as="h2">Condições de Uso</Header>
                <List as='ol'>{this.renderList(conditions)}</List>
              </div>
              <div className="management">
                <Header as="h2">Cadastro e Geração de Eventos</Header>
                <List as='ol'>{this.renderList(management)}</List>
              </div>
              <div className="account">
                <Header as="h2">Política de Encerramento de Conta</Header>
                <List as='ol'>{this.renderList(account)}</List>
              </div>
              <div className="responsibility">
                <Header as="h2">Limitação de Responsabilidade</Header>
                <List as='ol'>{this.renderList(responsibility)}</List>
              </div>
              <div className="compensation">
                <Header as="h2">Indenização</Header>
                <List as='ol'>{this.renderList(compensation)}</List>
              </div>
              <div className="agreement">
                <Header as="h2">Consentimento</Header>
                <List as='ol'>{this.renderList(agreement)}</List>
              </div>

            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserTerms;
