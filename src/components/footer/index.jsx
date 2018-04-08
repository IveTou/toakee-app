import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import autoBind from 'react-autobind';
import { compose } from 'recompose';
import { Grid, List, ListItem, Typography } from 'material-ui';

import { withInfo } from '~/src/hocs';
import { withAuth } from '~/src/components/auth-modal/hoc';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import  { Facebook, Instagram, Linkedin } from './social-icons';
import { withIndexStyle } from './styles';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { classes, viewer = {}, requireLogin } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    const signUp = () => {
      TrackingAPI.track({ name: 'SignUpTrigger.Clicked', pid: 'Guest' });
      requireLogin(() => {
        TrackingAPI.track({ name: 'User.Signed', pid });
        window.redirect = '/';
      }, 'signUp')();
    }

    const newEvent = () => {
      TrackingAPI.track({ name: 'EventTrigger.Clicked', logged, pid });
      logged
        ? this.props.history.push('/evento/novo')
        : requireLogin(() => {
          TrackingAPI.track({ name: 'User.Logged', pid });
          window.redirect = '/';
        })();
    }

    return (
      <footer className={classes.root}>
        <Grid container spacing={24} className={classes.container}>
          <Grid item sm={12} md={3} className={classes.column}>
            <Typography className={classes.title} align="center" variant="title" color="inherit">
              Fale conosco
            </Typography>
            <List dense>
              <ListItem className={classes.listItem}>contato@toakee.com</ListItem>
              <ListItem className={classes.listItem}>+55 71 996 763 313</ListItem>
              <ListItem className={classes.listItem}>Salvador-Ba</ListItem>
            </List>
          </Grid>
          <Grid item sm={12} md={3} className={classes.column}>
            <Typography className={classes.title} align="center" variant="title" color="inherit">
              Serviços
            </Typography>
            <List dense>
              <ListItem className={classes.listItem} component="a" onClick={newEvent}>
                Crie seu evento
              </ListItem>
              <If condition={!logged}>
                <ListItem
                  className={classes.listItem}
                  component="a"
                  onClick={signUp}
                >
                  Cadastre-se
                </ListItem>
              </If>
              <ListItem className={classes.listItem} component="a" href="/dashboard">
                Meus eventos
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={12} md={3} className={classes.column}>
            <Typography className={classes.title} align="center" variant="title" color="inherit">
              Sobre nós
            </Typography>
            <List dense>
              <ListItem className={classes.listItem} component="a" href="/quem-somos">
                Quem somos?
              </ListItem>
              <ListItem className={classes.listItem} component="a" href="/termos-de-uso">
                Termos de Uso
              </ListItem>
              <ListItem className={classes.listItem} component="a" href="/privacidade">
                Políticas de Privacidade
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={12} md={3} className={classes.column}>
            <Typography className={classes.title} align="center" variant="title" color="inherit">
              Estamos aqui!
            </Typography>
            <div className={classes.iconRow}>
              <Facebook className={classes.listItem} url="https://www.facebook.com/eu.toakee" />
              <Instagram className={classes.listItem} url="https://www.instagram.com/eu.toakee" />
              <Linkedin className={classes.listItem} url="https://linkedin.com/company/toakee" />
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 24 }}>
            <Typography align="center" variant="subheading" color="inherit">
              Copyright &copy; 2017 Toakee. Todos os direitos reservados.
            </Typography>
          </Grid>
        </Grid>
      </footer>
    );
  }
}

Footer.propTypes = {
  viewer: PropTypes.object,
  requireLogin: PropTypes.func,
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  withRouter,
  withAuth,
  withInfo(['viewer']),
  withIndexStyle,
)(Footer);
