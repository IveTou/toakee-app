import React from 'react';

import { Link, Element } from 'react-scroll';
import { Container, Grid, Header, List, Menu } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import classNames from 'classnames';

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

declare var clause;

const sections = [
  { name: 'Introdução', to: 'intro', content: intro },
  { name: 'Termos Gerais', to: 'general', content: general },
  { name: 'Condições de Uso', to: 'conditions', content: conditions },
  { name: 'Cadastro e Gestão de Eventos', to: 'management', content: management },
  { name: 'Política de Encerramento de Conta', to: 'account', content: account },
  { name: 'Limitação de Responsabilidade', to: 'responsibility', content: responsibility },
  { name: 'Indenização', to: 'compensation', content: compensation },
  { name: 'Consentimento', to: 'agreement', content: agreement },
];

class UseTerms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Introdução' };
    autoBind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  renderList(section) {
    return section.map(item => <List.Item as="li">{item}</List.Item>);
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="UseTerms">
        <Grid columns={2} relaxed>
          <If condition={!deviceInfo.isDesktop}>
            <Element name="intro" className="element intro">
              <Header as="h1">Toakee - Termos de Uso</Header>
              <List>{this.renderList(intro)}</List>
            </Element>
          </If>
          <Grid.Column className="UseTerms-menu">
            <Menu pointing secondary vertical color="orange">
              <For each="clause" of={sections}>
                <Link to={clause.to} smooth offset={-100} duration={500}>
                  <Menu.Item
                    name={clause.name}
                    active={activeItem === clause.name}
                    onClick={this.handleItemClick}
                  />
                </Link>
              </For>
            </Menu>
          </Grid.Column>
          <Grid.Column className="UseTerms-text">
            <Container text>
              <For each="clause" of={sections}>
                <If condition={clause.to !== 'intro' || deviceInfo.isDesktop}>
                  <Element name={clause.to} className="element">
                    <Header
                      className="UseTerms-text-header"
                      as={clause.to === 'intro' ? 'h1' : 'h2'}
                    >
                      {clause.name}
                      <Link
                        className={
                          classNames('UseTerms-text-header', { top: clause.to !== 'intro' })
                        }
                        to="intro"
                        smooth
                        offset={-100}
                        duration={500}
                      />
                    </Header>
                    <List as={clause.to === 'intro' ? '' : 'ol'}>
                      {this.renderList(clause.content)}
                    </List>
                  </Element>
                </If>
              </For>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UseTerms;
