import React from 'react';

import { Link, Element } from 'react-scroll';
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
      <Element name="intro" className="element intro">
        <Header as="h1">Toakee - Termos de Uso</Header>
        <List>{this.renderList(intro)}</List>
      </Element>
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
              <Link to="intro" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Intro"
                  active={activeItem === 'Intro'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="general" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Termos Gerais"
                  active={activeItem === 'Termos Gerais'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="conditions" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Condições de Uso"
                  active={activeItem === 'Condições de Uso'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="management" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Cadastro e Gestão de Eventos"
                  active={activeItem === 'Cadastro e Gestão de Eventos'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="account" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Política de Encerramento de Conta"
                  active={activeItem === 'Política de Encerramento de Conta'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="responsibility" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Limitação de Responsabilidade"
                  active={activeItem === 'Limitação de Responsabilidade'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="management" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Indenização"
                  active={activeItem === 'Indenização'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="agreement" smooth={true} offset={-100} duration={500}>
                <Menu.Item
                  name="Consentimento"
                  active={activeItem === 'Consentimento'}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu>
          </Grid.Column>
          <Grid.Column className="UseTerms-text">
            <Container text>
              <If condition={deviceInfo.isDesktop}>{this.renderIntro()}</If>
              <Element name="general" className="element">
                <Header as="h2">Termos Gerais</Header>
                <List as='ol'>{this.renderList(general)}</List>
              </Element>
              <Element name="conditions" className="element">
                <Header as="h2">Condições de Uso</Header>
                <List as='ol'>{this.renderList(conditions)}</List>
              </Element>
              <Element name="management" className="element">
                <Header as="h2">Cadastro e Geração de Eventos</Header>
                <List as='ol'>{this.renderList(management)}</List>
              </Element>
              <Element name="account" className="element">
                <Header as="h2">Política de Encerramento de Conta</Header>
                <List as='ol'>{this.renderList(account)}</List>
              </Element>
              <Element name="responsibility" className="element">
                <Header as="h2">Limitação de Responsabilidade</Header>
                <List as='ol'>{this.renderList(responsibility)}</List>
              </Element>
              <Element name="compensation" className="element">
                <Header as="h2">Indenização</Header>
                <List as='ol'>{this.renderList(compensation)}</List>
              </Element>
              <Element name="agreement" className="element">
                <Header as="h2">Consentimento</Header>
                <List as='ol'>{this.renderList(agreement)}</List>
              </Element>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UseTerms;
