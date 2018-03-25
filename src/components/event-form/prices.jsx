import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Icon, IconButton, Tooltip } from 'material-ui';

import { withPricesStyle } from './styles';

const EventFormPrices = ({
  form: { setFieldValue, values: { prices } },
  classes,
}) => {
  const addPrice = () =>
    setFieldValue('prices', [...(prices.length ? prices : [{}]), {}]);

  const removePrice = idx =>
    setFieldValue('prices', prices.filter((_, i) => idx !== i));

  const handlePriceChange = (e) => {
    const [_index, name] = e.target.name.split(':');
    const index = parseInt(_index, 10);
    setFieldValue('prices', prices.map((price, i) => (
      i !== index ? price : { ...price, [name]: e.target.value }
    )));
  };

  declare var idx;
  declare var price;

  return (
    <div>
      <Choose>
        <When condition={prices.length > 1}>
          <For each="price" of={prices} index="idx">
            <div className={classes.price} key={idx}>
              <TextField
                name={`${idx}:description`}
                label="Descrição"
                value={price.description || ''}
                onChange={handlePriceChange}
                fullWidth
              />
              <TextField
                name={`${idx}:value`}
                label="Valor"
                value={price.value || ''}
                onChange={handlePriceChange}
                fullWidth
              />
              <Tooltip title="Remover preço">
                <IconButton onClick={() => removePrice(idx)}>
                  <Icon>remove_circle_outline</Icon>
                </IconButton>
              </Tooltip>
            </div>
          </For>
        </When>
        <Otherwise>
          <div className={classes.price}>
            <TextField
              name="0:value"
              label="Valor"
              value={prices[0] && prices[0].value}
              onChange={handlePriceChange}
            />
          </div>
        </Otherwise>
      </Choose>
      <Button className={classes.addButton} onClick={addPrice} color="primary">
        <Icon>add</Icon>
        Adicionar preço
      </Button>
    </div>
  );
};

EventFormPrices.propTypes = {
  classes: PropTypes.object,
  form: PropTypes.shape({
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
  }),
};

export const validation = {};

export default withPricesStyle(EventFormPrices);
