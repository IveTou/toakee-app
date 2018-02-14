import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BannerImage = ({ title, subtitle, img, url, description, ...slickProps }) => (
  <Link {...slickProps} to={url} aria-label={description}>
    <div className="BannerImage" style={{ backgroundImage: `url(${img})` }}>
      <div className="BannerImage-content">
        <div className="BannerImage-content-title">{title}</div>
        <div className="BannerImage-content-subtitle">{subtitle}</div>
      </div>
    </div>
  </Link>
);

BannerImage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
};

export default BannerImage;
