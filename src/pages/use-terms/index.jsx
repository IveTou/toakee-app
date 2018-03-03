import React from 'react';

import { Link, Element } from 'react-scroll';
import { Container, Grid, Header, List } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import classNames from 'classnames';

import { withInfo } from '~/src/hocs';

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
    autoBind(this);
  }

  renderList(section) {
    // eslint-disable-next-line react/no-array-index-key
    return section.map((item, idx) => <List.Item key={idx} as="li">{item}</List.Item>);
  }

  render() {
    return (
      <div className="UseTerms">
        <Grid relaxed>
          <Grid.Column className="UseTerms-text">
            <Container text>
              <For each="clause" of={sections}>
                <Element key={clause.to} name={clause.to} className="element">
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
              </For>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withInfo(UseTerms, ['deviceInfo']);
