import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { keys } from 'lodash';

const buildClasses = ({ open }) => classNames('DashboardMenuItem', {
  'DashboardMenuItem--open': open,
});

declare var option;

const options = {
  lista: 'Confirmar nomes na lista',
  'editar-listas': 'Gerenciar listas',
};

const DashboardMenuItem = ({ slug, flyer, title, open }) => (
  <div className={buildClasses({ open })}>
    <Link to={{ pathname: `/dashboard/${slug}/lista` }}>
      <div className="DashboardMenuItem-header">
        <div className="DashboardMenuItem-header-flyer">
          <img alt="flyer do evento" src={flyer} />
        </div>
        <div className="DashboardMenuItem-header-title">{title}</div>
      </div>
    </Link>
    <div className="DashboardMenuItem-content">
      <For each="option" of={keys(options)}>
        <Link
          key={option}
          to={{ pathname: `/dashboard/${slug}/${option}` }}
          className="DashboardMenuItem-content-option"
          activeClassName="active"
        >
          {options[option]}
        </Link>
      </For>
    </div>
  </div>
);

DashboardMenuItem.propTypes = {
  slug: PropTypes.string,
  flyer: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
};

export default DashboardMenuItem;
