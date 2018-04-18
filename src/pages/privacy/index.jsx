import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import autoBind from 'react-autobind';

import Section from './section';

import intro from './intro.js';
import information from './information.js';
import use from './use.js';
import sharing from './sharing.js';
import choices from './choices.js';
import contact from './contact.js';
import changes from './changes.js';

import { withIndexStyle } from './styles';

const sections = [
  {
    'title': 'Políticas de Privacidade',
    'content': intro,
  },
  {
    'title': '1. Informações que coletamos',
    'content': information,
  },
  {
    'title': '2. Como nós usamos suas informações',
    'content': use,
  },
  {
    'title': '3. Compartilhamento de suas informações',
    'content': sharing,
  },
  {
    'title': '4. Suas escolhas sobre suas informações',
    'content': choices,
  },
  {
    'title': '5. Como entrar em contato conosco',
    'content': contact,
  },
  {
    'title': '6. Alterações em nossa política de privacidade',
    'content': changes,
  },
];

const Privacy = ({ classes }) => {
  declare var sectionItem;

  return (
    <div className={classes.root}>
      <For each="sectionItem" of={sections} index="index">
        <Section
          title={sectionItem.title}
          titleVariant={index == 0 ? 'display1' : 'headline'}
          content={sectionItem.content}
          key={index}
        />
      </For>
    </div>
  );
}

Privacy.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(Privacy);
