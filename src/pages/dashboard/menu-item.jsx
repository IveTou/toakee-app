import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { keys } from 'lodash';

import { closeDashboard } from '~/src/ducks/dashboard';

const buildClasses = ({ open }) => classNames('DashboardMenuItem', {
  'DashboardMenuItem--open': open,
});

declare var option;

const options = {
  lista: 'Confirmar nomes na lista',
  'editar-listas': 'Gerenciar listas',
};

const DashboardMenuItem = ({ slug, flyer, title, open, onClick }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className={buildClasses({ open })} onClick={onClick}>
    <NavLink to={`/dashboard/${slug}/lista`}>
      <div className="DashboardMenuItem-header">
        <div className="DashboardMenuItem-header-flyer">
          <img alt="flyer do evento" src={flyer} />
        </div>
        <div className="DashboardMenuItem-header-title">{title}</div>
      </div>
    </NavLink>
    <div className="DashboardMenuItem-content">
      <For each="option" of={keys(options)}>
        <NavLink
          key={option}
          to={`/dashboard/${slug}/${option}`}
          className="DashboardMenuItem-content-option"
          activeClassName="active"
        >
          {options[option]}
        </NavLink>
      </For>
    </div>
  </div>
);

DashboardMenuItem.propTypes = {
  slug: PropTypes.string,
  flyer: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

export default connect(
  () => ({}),
  dispatch => ({ onClick: () => dispatch(closeDashboard()) }),
)(DashboardMenuItem);
