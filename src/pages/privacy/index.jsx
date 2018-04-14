import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';

import intro from './intro.js';
import information from './information.js';
import use from './use.js';
import sharing from './sharing.js';
import choices from './choices.js';
import contact from './contact.js';
import changes from './changes.js';

import { withIndexStyle } from './styles';

const Privacy = ({ classes }) => {
  declare var introItem;
  declare var informationItem;
  declare var useItem;
  declare var sharingItem;
  declare var choicesItem;
  declare var contactItem;
  declare var changesItem;

  return (
    <div className={classes.root}>
      <Typography variant="display1" gutterBottom>Políticas de Privacidade</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="introItem" of={intro} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: introItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>1. Informações que coletamos</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="informationItem" of={information} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: informationItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>2. Como nós usamos suas informações</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="useItem" of={use} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: useItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>3. Compartilhamento de suas informações</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="sharingItem" of={sharing} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: sharingItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>4. Suas escolhas sobre suas informações</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="choicesItem" of={choices} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: choicesItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>5. Como entrar em contato conosco</Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="contactItem" of={contact} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: contactItem }}
          />
        </For>
      </Typography>

      <Typography variant="title" gutterBottom>
        6. Alterações em nossa política de privacidade
      </Typography>
      <Typography variant="subheading" align="justify" component="ul" className={classes.list}>
        <For each="changesItem" of={changes} index="index">
          <li
            key={index}
            className={classes.listItem}
            dangerouslySetInnerHTML={{ __html: changesItem }}
          />
        </For>
      </Typography>
    </div>
  );
};

Privacy.propTypes = {
  classes: PropTypes.object,
};

export default withIndexStyle(Privacy);
