import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const { CLOUDINARY_API_URI, UPLOAD_FLYER_PRESET } = config;

class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploadedFileUrl: '', uploadedFile: '' };
    autoBind(this);
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
  }

  handleImageUpload(e, { file }) {
    const upload = request.post(`${CLOUDINARY_API_URI}/upload`)
      .field('upload_preset', UPLOAD_FLYER_PRESET)
      .field('file', file)
      .end((err, response) => {
        if (err) {
          console.error(err);
        }

        if (response.body.secure_url !== '') {
          this.setState({ uploadedFileUrl: response.body.secure_url });
        }
      });
  }

  render() {
    const { uploadedFileUrl, uploadedFile } = this.state;
    const hasFile = uploadedFile !== '';
    const wasUploaded = uploadedFileUrl !== '';

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
              <Image src={uploadedFile.preview} size="huge" />
            </If>
            <label>Drop an image or click to select a file to upload.</label>
          </Dropzone>
        </Grid.Column>
        <Grid.Column width={8}>
          <If condition={wasUploaded}>
            <div>
              <Header as="h4">File Name</Header>
              <label>{uploadedFile.name}</label>
              <Header as="h4">File URL</Header>
              <label>{uploadedFileUrl}</label>
              <div>
              </div>
            </div>
          </If>
          <If condition={hasFile}>
            <Button
              inverted
              color="orange"
              file={uploadedFile}
              onClick={this.handleImageUpload}
            >
              Upload
            </Button>
          </If>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventCreator;
