import React, { PropTypes } from 'react';
import { TextField, FlatButton, FontIcon, IconButton } from 'material-ui';

const EventFormPrices = ({
  form: { values, setFieldValue },
}) => {
  const { prices } = values;
  const addPrice = () => setFieldValue('prices', [...(prices.length ? prices : [{}]), {}]);
  const removePrice = idx =>
    setFieldValue('prices', [...prices.slice(0, idx), ...prices.slice(idx + 1)]);
  const handlePriceChange = (e, value) => {
    const [index, name] = e.target.name.split(':');
    setFieldValue('prices', [
      ...prices.slice(0, index),
      { ...prices[index], [name]: value },
      ...prices.slice(index + 1),
    ]);
  };

  declare var idx;
  declare var price;

  return (
    <div className="EventFormPrices">
      <Choose>
        <When condition={prices.length > 1}>
          <For each="price" of={prices} index="idx">
            <TextField
              name={`${idx}:description`}
              floatingLabelText="Descrição"
              value={price.description}
              onChange={handlePriceChange}
            />
            <TextField
              name={`${idx}:value`}
              floatingLabelText="Valor"
              value={price.value}
              onChange={handlePriceChange}
            />
            <IconButton tooltip="Remover preço" secondary>
              <FontIcon
                className="EventFormPrices-remove material-icons"
                onClick={() => removePrice(idx)}
              >
                remove_circle_outline
              </FontIcon>
            </IconButton>
          </For>
        </When>
        <Otherwise>
          <TextField
            name="0:value"
            floatingLabelText="Valor"
            value={prices[0] && prices[0].value}
            onChange={handlePriceChange}
            fullWidth
          />
        </Otherwise>
      </Choose>
      <div className="EventFormPrices-add">
        <FlatButton
          label="Adicionar Preço"
          icon={<FontIcon className="material-icons">add</FontIcon>}
          onClick={addPrice}
          primary
        />
      </div>
    </div>
  );
};

EventFormPrices.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
  }),
};

export const validation = {};

export default EventFormPrices;
