import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const { UPLOAD_URL, UPLOAD_BANNER_PRESET } = config;

class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploadedFileUrl: '' };
    autoBind(this);
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(files) {
    const upload = request.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_BANNER_PRESET)
      .field('file', files);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({ uploadedFileUrl: response.body.secure_url });
      }
    });
  }

  render() {
    const hasFile = this.state.uploadedFileUrl !== '';

    return (
      <Grid className="EventCreator">
        <Grid.Column width={8}>
          <Dropzone
            className="DropZone"
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
          >
            <If condition={hasFile}>
              <Image src={this.state.uploadedFileUrl} size="huge"/>
            </If>
            <label>Drop an image or click to select a file to upload.</label>
          </Dropzone>
        </Grid.Column>
        <Grid.Column width={8}>
          <If condition={hasFile}>
            <div>
              <Header as='h4'>File Name</Header>
              <label>{this.state.uploadedFile.name}</label>
              <Header as='h4'>File URL</Header>
              <label>{this.state.uploadedFileUrl}</label>
            </div>
          </If>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventCreator;
