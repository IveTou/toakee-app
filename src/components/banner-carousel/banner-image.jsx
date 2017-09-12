import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BannerImage = ({ title, subtitle, img, url, ...slickProps }) => (
  <Link {...slickProps} to={{ pathname: `${url}` }}>
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
};

export default BannerImage;
