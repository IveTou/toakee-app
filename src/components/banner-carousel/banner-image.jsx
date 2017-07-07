import React, { PropTypes } from 'react';

const BannerImage = ({ img, url, ...slickProps }) => (
  <a {...slickProps} href={url}>
    <div className="BannerImage" style={{ backgroundImage: `url(${img})` }} />
  </a>
);

BannerImage.propTypes = {
  img: PropTypes.string,
  url: PropTypes.string,
  slickProps: PropTypes.object,
};

export default BannerImage;
