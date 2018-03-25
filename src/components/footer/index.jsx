import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import autoBind from 'react-autobind';
import { compose } from 'recompose';
import { Grid, List, ListItem, Typography } from 'material-ui';

import { openAuthModal } from '~/src/ducks/auth-modal';
import { withInfo } from '~/src/hocs';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import  { Facebook, Instagram, Linkedin } from './social-icons';
import { withIndexStyle } from './styles';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  newEvent() {
    const { viewer, auth } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

    TrackingAPI.track({ name: 'New Event Trigger', logged, pid });
    logged ? this.props.history.push('/evento/novo') : auth();
  }

  render() {
    const { auth, classes, viewer = {} } = this.props;
    const pid = (viewer && viewer.id) || null;
    const logged = !!pid;

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
              <ListItem className={classes.listItem} component="a" onClick={this.newEvent}>
                Crie seu evento
              </ListItem>
              <If condition={!logged}>
                <ListItem
                  className={classes.listItem}
                  component="a"
                  onClick={() => auth('signUp')}
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
<<<<<<< HEAD
=======
        <Divider className="Footer-divider" clearing />
        <Segment basic>
          <Image
            className="Footer-image"
            src={assetsUrl('/core/site/logo-white-x64.png')}
            size="mini"
            alt="Toakee.com"
            centered
          />
          <Link className="Footer-link about" to="/quem-somos">
            <span>Quem somos?</span>
          </Link>
          <Link className="Footer-link terms" to="/termos-de-uso">
            <span>Termos de Uso</span>
          </Link>
          <If condition={!viewer.id}>
            <Link className="Footer-link signup" to="/cadastrar">
              <span>Cadastre-se</span>
            </Link>
          </If>
          <Segment className="Footer-copyright" basic>
            Copyright &copy; 2017 Toakee. Todos os direitos reservados.
          </Segment>
        </Segment>
>>>>>>> Improve event list skip
      </footer>
    );
  }
}

Footer.propTypes = {
  viewer: PropTypes.object,
  auth: PropTypes.func,
  classes: PropTypes.object,
  history: PropTypes.object,
};

const injectStore = connect(
  ({ authModal }) => authModal.toJS(),
  dispatch => ({
    auth: (mode) => {
      dispatch(openAuthModal(_, mode));
      mode == 'signUp' && TrackingAPI.track({ name: 'Landing SignUp Trigger', pid: 'Guest' });
    }
  }),
);

export default compose(
  injectStore,
  withRouter,
  withInfo(['viewer']),
  withIndexStyle,
)(Footer);
