import React from 'react';
import { Container, Grid, Header, Menu, Sticky } from 'semantic-ui-react';
import autoBind from 'react-autobind';

if (process.env.BROWSER) {
  require('./style.scss');
}

class UserTerms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home'};
    autoBind(this);
  }

  handleContextRef (contextRef) {
    this.setState({ contextRef });
  }

  handleItemClick (e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { contextRef, activeItem } = this.state;
    console.log(contextRef);

    return (
      <div className="UserTerms" ref={this.handleContextRef}>
        <Grid>
          <Grid.Column width={4}>

              <Menu pointing secondary vertical color="orange">
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
              </Menu>

          </Grid.Column>
          <Grid.Column  width={12}>
            <Container text>
              <Header as='h2'>Header</Header>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserTerms;
