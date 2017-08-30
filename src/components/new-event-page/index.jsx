import React from 'react';
import { Grid, Card, Header, Form, Icon, Image, Button } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import { range, xor, includes } from 'lodash';
import Dropzone from 'react-dropzone';
import RichTextEditor from 'react-rte/lib/RichTextEditor';
import request from 'superagent';
import autoBind from 'react-autobind';
import moment from 'moment';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var hour;
declare var minute;
declare var category;
declare var index;

const { CLOUDINARY_API_URI, UPLOAD_FLYER_PRESET } = config;
const addZero = number => `${number < 10 ? '0' : ''}${number}`;
const categories = [
  { label: 'Balada', id: '590a1820cbf3d0000f704f1d', color: 'black' },
  { label: 'Show', id: '5907e89cb65971000fbffb11', color: 'teal' },
  { label: 'Teatro', id: '5907e89cb65971000fbffb10', color: 'blue' },
  { label: 'Comida', id: '5869c086fdec825a1649f3c1', color: 'yellow' },
  { label: 'Esporte', id: '591e7b7654b3a6000fc5c4a3', color: 'red' },
  { label: 'Geek', id: '59212fbd1aaae4000f65323b', color: 'purple' },
  { label: 'Música', id: '5869c086fdec825a1649f3c5', color: 'brown' },
  { label: 'Bar', id: '590a6d39cbf3d0000f704f32', color: 'violet' },
  { label: 'Corridas', id: '5976c00afad0ba00049e6442', color: 'orange' },
  { label: 'Dança', id: '5908412710e01d000fb72d52', color: 'grey' },
  { label: 'Festival', id: '598a3cd828fdb10004071915', color: 'pink' },
  { label: 'Infantil', id: '907f6d3b65971000fbffb14', color: 'green' },
  { label: 'Palestras', id: '59954ab53482a80004c50ddf', color: 'olive' },
];

class NewEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: RichTextEditor.createEmptyValue(),
      selectedCategories: [],
      prices: [{ type: '', value: '' }],
      file: '',
      uploadedFile: '',
    };
    autoBind(this);
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  onImageDrop(files) {
    this.setState({ file: files[0] });
  }

  onChangePrice(e) {
    const { name, value } = e.target;
    const [idx, attr] = name.split(':');
    this.state.prices[parseInt(idx, 10)][attr] = moment.isMoment(value)
      ? value.format('DD/MM/YY')
      : value;

    this.forceUpdate();
  }

  toggleCategory(e, id) {
    e.preventDefault();
    this.setState({ selectedCategories: xor(this.state.selectedCategories, [id]) });
  }

  addPrice(e) {
    e.preventDefault();
    this.setState({
      prices: this.state.prices.concat({ type: '', value: '' }),
    });
  }

  removePrice(e, idx) {
    e.preventDefault();
    this.setState({ prices: this.state.prices.filter((_, i) => i !== idx) });
  }

  render() {
    const { description, prices, selectedCategories, file, uploadedFile } = this.state;
    const hadUploaded = uploadedFile !== '';

    return (
      <div className="NewEventPage">
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column tablet={16} computer={8} className="NewEventPage-basics">
                <div className="NewEventPage-basics-content">
                  <Header as="h2" inverted>Novo evento</Header>
                  <Card>
                    <Card.Content>
                      <Dropzone
                        className="NewEventPage-basics-content-flyer"
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop}
                      >
                        <Image src={file.preview} />
                        <div className="NewEventPage-basics-content-flyer-message">
                          <Icon name="plus circle" size="massive" color="grey" />
                          <div>
                            Clique para adicionar um banner ao seu evento
                          </div>
                        </div>
                      </Dropzone>
                    </Card.Content>
                    <Card.Content>
                      <Form.Input className="file" id="flyerInput" />
                      <Form.Input name="name" placeholder="Nome do evento" />
                      <Form.Input placeholder="Local do evento" />
                    </Card.Content>
                    <Card.Content className="NewEventPage-basics-content-date">
                      <Form.Group>
                        <Form.Input
                          label="Começa"
                          inputProps={{ placeholder: 'Data' }}
                          dateFormat="DD/MM/YY"
                          timeFormat={false}
                          control={DateTime}
                          width={5}
                        />
                        <Form.Input
                          list="time"
                          placeholder="Hora"
                          control="input"
                          width={4}
                        />
                        <Form.Input
                          label="Termina"
                          inputProps={{ placeholder: 'Data' }}
                          dateFormat="DD/MM/YY"
                          timeFormat={false}
                          control={DateTime}
                          width={5}
                        />
                        <Form.Input
                          list="time"
                          placeholder="Hora"
                          control="input"
                          width={4}
                        />
                        <datalist id="time">
                          <For each="hour" of={range(0, 24)}>
                            <For each="minute" of={range(0, 60, 5)}>
                              <option value={`${addZero(hour)}:${addZero(minute)}`} />
                            </For>
                          </For>
                        </datalist>
                      </Form.Group>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>

              <Grid.Column tablet={16} computer={8}>
                <div className="NewEventPage-details">
                  <Header as="h3">Detalhes do evento</Header>
                  <RichTextEditor
                    value={description}
                    onChange={v => this.onChange('description', v)}
                    placeholder="Insira descrição aqui..."
                    className="NewEventPage-details-description"
                  />

                  <div className="NewEventPage-details-categories">
                    <Header as="h4">
                      <Icon name="tag" color="orange" /> Categorias
                    </Header>
                    <For each="category" of={categories}>
                      <Button
                        key={category.id}
                        color={category.color}
                        onClick={e => this.toggleCategory(e, category.id)}
                        basic={!includes(selectedCategories, category.id)}
                      >
                        {category.label}
                      </Button>
                    </For>
                  </div>

                  <div className="NewEventPage-details-prices">
                    <Header as="h4">
                      <Icon name="dollar" color="orange" /> Preços
                    </Header>
                    <For each="price" of={prices} index="index">
                      <Form.Group>
                        <Form.Input
                          placeholder="Tipo"
                          width={9}
                          value={prices[index].type}
                          name={`${index}:type`}
                          onChange={this.onChangePrice}
                        />
                        <Form.Input
                          list="priceTypes"
                          placeholder="Valor"
                          control="input"
                          width={7}
                          value={prices[index].value}
                          name={`${index}:value`}
                          onChange={this.onChangePrice}
                        />
                        <datalist id="priceTypes">
                          <option key="1kg" value="1kg Alimento" />
                          <option key="2kg" value="2kg Alimento" />
                          <option key="free" value="Gratuito" />
                          <option key="anything" value="Pague quanto quiser" />
                          <option key="food" value="Alimento não perecível" />
                        </datalist>
                        <Choose>
                          <When condition={index === prices.length - 1}>
                            <Button
                              icon="plus"
                              color="orange"
                              circular
                              basic
                              onClick={this.addPrice}
                            />
                          </When>
                          <Otherwise>
                            <Button
                              icon="minus"
                              circular
                              basic
                              onClick={e => this.removePrice(e, index)}
                            />
                          </Otherwise>
                        </Choose>
                      </Form.Group>
                    </For>
                  </div>

                  <div className="NewEventPage-details-confirmation">
                    <Button color="green">Cadastrar</Button>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default NewEventPage;
