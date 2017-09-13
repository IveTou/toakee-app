import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Grid, Card, Header, Form, Icon, Image, Button, Popup } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import { range, xor, includes, pick, omit } from 'lodash';
import Dropzone from 'react-dropzone';
import RichTextEditor from 'react-rte/lib/RichTextEditor';
import autoBind from 'react-autobind';
import moment from 'moment';

import PlacesAutocomplete from '~/src/components/places-autocomplete';
import CloudinaryApi from '~/src/toakee-core/apis/cloudinary.js';

import { validateNewEvent } from './validation';
import { createEventMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var hour;
declare var minute;
declare var category;
declare var index;

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
      flyer: '',
      title: '',
      description: RichTextEditor.createEmptyValue(),
      selectedCategories: [],
      prices: [{ description: '', value: '' }],
      place: {},
      startDate: moment(),
      endDate: moment(),
      errors: {},
      submitting: false,
    };
    autoBind(this);
  }

  onChange(e, { name, value }) {
    this.setState({
      [name]: value,
      errors: omit(this.state.errors, name),
    });
  }

  onChangePrice(e) {
    const { name, value } = e.target;
    const [idx, attr] = name.split(':');
    this.state.prices[parseInt(idx, 10)][attr] = value;

    this.forceUpdate();
  }

  async onFlyerDrop([flyer]) {
    this.setState({ flyer });
  }

  async onSubmit(e) {
    e.preventDefault();

    const {
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      prices,
      selectedCategories,
    } = this.state;

    const form = {
      ...pick(this.state, ['flyer', 'title', 'place']),
      categories: selectedCategories.map(id => ({ id })),
      start: moment(startDate.format(`YYYY-MM-DD [${startTime}]`)),
      end: moment(endDate.format(`YYYY-MM-DD [${endTime}]`)),
      description: description.toString('html'),
      prices: prices.filter(p => p.description && p.value),
    };

    const errors = validateNewEvent(form);
    this.setState({ errors: errors || {}, submitting: !errors });

    if (!errors) {
      const { url: flyerUrl } = await CloudinaryApi.uploadFlyer(this.state.flyer);
      const { data } = await this.props.createEvent({ ...form, flyer: flyerUrl });
      this.props.router.push(`/evento/${data.createEvent.slug}`);
    }
  }

  toggleCategory(e, id) {
    e.preventDefault();
    this.setState({ selectedCategories: xor(this.state.selectedCategories, [id]) });
  }

  addPrice(e) {
    e.preventDefault();
    this.setState({
      prices: this.state.prices.concat({ description: '', value: '' }),
    });
  }

  removePrice(e, idx) {
    e.preventDefault();
    this.setState({ prices: this.state.prices.filter((_, i) => i !== idx) });
  }

  renderErrorIcon(input, icon) {
    const { [input]: errors } = this.state.errors;
    const defaultIcon = <Icon link name="warning" color="red" />;

    return errors && (
      <Popup
        trigger={icon || defaultIcon}
        content={errors[0]}
        position="top center"
        hideOnScroll
      />
    );
  }

  render() {
    const {
      errors,
      submitting,
      description,
      prices,
      selectedCategories,
      flyer = {},
    } = this.state;

    return (
      <div className="NewEventPage">
        <Form onSubmit={this.onSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column tablet={16} computer={8} className="NewEventPage-basics">
                <div className="NewEventPage-basics-content">
                  <Header as="h2" inverted>Novo evento</Header>
                  <Card>
                    <If condition={flyer.preview}>
                      <Image src={flyer.preview} className="NewEventPage-basics-content-flyer" />
                    </If>
                    <Card.Content>
                      <Dropzone
                        className="NewEventPage-basics-content-dropzone"
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onFlyerDrop}
                      >
                        <div className="NewEventPage-basics-content-dropzone-message">
                          <Icon name="plus circle" size="massive" color="grey" />
                          <div>
                            Clique para adicionar um banner ao seu evento
                          </div>
                        </div>
                      </Dropzone>
                    </Card.Content>
                    <Card.Content>
                      <Form.Input
                        className="file"
                        id="flyerInput"
                        content={flyer.path}
                      />
                      <Form.Input
                        name="title"
                        placeholder="Título"
                        onChange={this.onChange}
                        icon={this.renderErrorIcon('title')}
                        error={!!errors.title}
                      />
                      <Form.Input
                        name="place"
                        placeholder="Local"
                        control={PlacesAutocomplete}
                        onResultSelect={this.onChange}
                        error={!!errors.place}
                      />
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
                          onChange={t => (
                            this.onChange({}, { name: 'startDate', value: t })
                          )}
                          icon={this.renderErrorIcon('start')}
                          error={!!errors.start}
                        />
                        <Form.Input
                          list="time"
                          placeholder="Hora"
                          control="input"
                          name="startTime"
                          width={4}
                          onChange={e => this.onChange(e, e.target)}
                          error={!!errors.start}
                        />
                        <Form.Input
                          label="Termina"
                          inputProps={{ placeholder: 'Data' }}
                          dateFormat="DD/MM/YY"
                          timeFormat={false}
                          control={DateTime}
                          name="endDate"
                          width={5}
                          onChange={t => (
                            this.onChange({}, { name: 'endDate', value: t })
                          )}
                          icon={this.renderErrorIcon('end')}
                          error={!!errors.end}
                        />
                        <Form.Input
                          list="time"
                          placeholder="Hora"
                          control="input"
                          name="endTime"
                          width={4}
                          onChange={e => this.onChange(e, e.target)}
                          error={!!errors.end}
                        />
                        <datalist id="time">
                          <For each="hour" of={range(0, 24)}>
                            <For each="minute" of={[0, 30]}>
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
                  <Form.Input
                    control={RichTextEditor}
                    value={description}
                    onChange={v => this.onChange({}, { name: 'description', value: v })}
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
                      <Form.Group key={index}>
                        <Form.Input
                          placeholder="Tipo"
                          width={9}
                          value={prices[index].description}
                          name={`${index}:description`}
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
                    <Button color="green" loading={submitting}>
                      Cadastrar
                    </Button>
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

NewEventPage.propTypes = {
  router: PropTypes.object,
};

export default graphql(createEventMutation, {
  props: ({ mutate }) => ({
    createEvent: variables => mutate({ variables }),
  }),
})(NewEventPage);

