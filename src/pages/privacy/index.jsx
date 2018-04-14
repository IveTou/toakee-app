import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import autoBind from 'react-autobind';

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
    'topic': false,
  },
  {
    'title': '1. Informações que coletamos',
    'content': information,
    'topic': true,
  },
  {
    'title': '2. Como nós usamos suas informações',
    'content': use,
    'topic': true,
  },
  {
    'title': '3. Compartilhamento de suas informações',
    'content': sharing,
    'topic': true,
  },
  {
    'title': '4. Suas escolhas sobre suas informações',
    'content': choices,
    'topic': true,
  },
  {
    'title': '5. Como entrar em contato conosco',
    'content': contact,
    'topic': true,
  },
  {
    'title': '6. Alterações em nossa política de privacidade',
    'content': changes,
    'topic': true,
  },
];

export class Privacy extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderSection(title, content, topic, key) {
    const { classes } = this.props;
    declare var item;

    return (
      <div key={key}>
        <Typography variant={topic ? 'headline' : 'display1'} gutterBottom>{title}</Typography>
        <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
          <For each="item" of={content} index="index">
            <li
              key={index}
              className={classes.listItem}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </For>
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    declare var sectionItem;

    return (
      <div className={classes.root}>
        <For each="sectionItem" of={sections} index="index">
          {this.renderSection(sectionItem.title, sectionItem.content, sectionItem.topic, index)}
        </For>
      </div>
    );
  }
}

Privacy.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(Privacy);
