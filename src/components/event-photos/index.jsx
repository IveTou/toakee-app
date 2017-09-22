import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Image, Header } from 'semantic-ui-react';
import Lightbox from 'react-images';
import autoBind from 'react-autobind';

import { isLogged } from '~/src/utils/session';
import TrackingAPI from '~/src/toakee-core/apis/tracking';

import query from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var image;
declare var index;

export class EventPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lightboxIsOpen: false, currentImage: 0 };
    autoBind(this);
  }

  componentWillReceiveProps({ viewer }) {
    if (!isLogged()) {
      TrackingAPI.track('Unlogged Event Photos Page View', 'Guest');
    } else if (viewer) {
      TrackingAPI.track('Logged Event Photos Page View', viewer.id);
    }
  }

  handleClickPrev() {
    this.openPhoto(this.state.currentImage - 1);
  }

  handleClickNext() {
    this.openPhoto(this.state.currentImage + 1);
  }

  openPhoto(idx) {
    this.setState({ lightboxIsOpen: true, currentImage: idx });
  }

  closeLightBox() {
    this.setState({ lightboxIsOpen: false });
  }

  render() {
    const { viewer = {} } = this.props;
    const { event = {} } = viewer;
    const { title, photos = [] } = event;

    return (
      <div className="EventPhotos">
        <Header color="orange" as="h1">{title}</Header>

        <Lightbox
          images={photos.map(src => ({ src }))}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.handleClickPrev}
          onClickNext={this.handleClickNext}
          onClose={this.closeLightBox}
          currentImage={this.state.currentImage}
        />
        <Image.Group>
          <For each="image" of={photos} index="index">
            <img
              className="ui image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => this.openPhoto(index)}
            />
          </For>
        </Image.Group>
      </div>
    );
  }
}

EventPhotos.propTypes = {
  viewer: PropTypes.object,
};

export default graphql(query, {
  options: ({ router }) => ({
    variables: { slug: router.params.slug },
  }),
  props: ({ data: { viewer } }) => ({ viewer }),
})(EventPhotos);
