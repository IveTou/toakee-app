import React from 'react';

import { Link } from 'react-router';
import { Container, Grid, Header, List, Menu, Sticky } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import { deviceInfo } from '~/src/utils/device-info';

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

class UseTerms extends React.Component {
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

  renderIntro() {
    return (
      <div className="intro" id="intro">
        <Header as="h1">Toakee - Termos de Uso</Header>
        <List>{this.renderList(intro)}</List>
      </div>
    );
  }

  render() {
    const { contextRef, activeItem } = this.state;

    return (
      <div className="UseTerms" ref={this.handleContextRef}>
        <Grid columns={2} relaxed>
          <If condition={!deviceInfo.isDesktop}>{this.renderIntro()}</If>
          <Grid.Column className="UseTerms-menu">
            <Menu pointing secondary vertical color="orange">
              <Menu.Item
                name="intro"
                href="#intro"
                active={activeItem === 'intro'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#general"
                name="Termos Gerais"
                active={activeItem === 'Termos Gerais'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#conditions"
                name="Condições de Uso"
                active={activeItem === 'Condições de Uso'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#management"
                name="Cadastro e Gestão de Eventos"
                active={activeItem === 'Cadastro e Gestão de Eventos'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#account"
                name="Política de Encerramento de Conta"
                active={activeItem === 'Política de Encerramento de Conta'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#responsibility"
                name="Limitação de Responsabilidade"
                active={activeItem === 'Limitação de Responsabilidade'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#compensation"
                name="Indenização"
                active={activeItem === 'Indenização'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                href="#agreement"
                name="Consentimento"
                active={activeItem === 'Consentimento'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column className="UseTerms-text">
            <Container text>
              <If condition={deviceInfo.isDesktop}>{this.renderIntro()}</If>
              <div className="general" id="general">
                <Header as="h2">Termos Gerais</Header>
                <List as='ol'>{this.renderList(general)}</List>
              </div>
              <div className="conditions" id="conditions">
                <Header as="h2">Condições de Uso</Header>
                <List as='ol'>{this.renderList(conditions)}</List>
              </div>
              <div className="management" id="management">
                <Header as="h2">Cadastro e Geração de Eventos</Header>
                <List as='ol'>{this.renderList(management)}</List>
              </div>
              <div className="account" id="account">
                <Header as="h2">Política de Encerramento de Conta</Header>
                <List as='ol'>{this.renderList(account)}</List>
              </div>
              <div className="responsibility" id="responsibility">
                <Header as="h2">Limitação de Responsabilidade</Header>
                <List as='ol'>{this.renderList(responsibility)}</List>
              </div>
              <div className="compensation" id="compensation">
                <Header as="h2">Indenização</Header>
                <List as='ol'>{this.renderList(compensation)}</List>
              </div>
              <div className="agreement" id="agreement">
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

export default UseTerms;
