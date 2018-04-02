import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Icon, IconButton, Tooltip } from 'material-ui';
import moment from 'moment';
import { DateTimePicker } from 'material-ui-pickers';

import { withDiscountListsStyle } from './styles';

moment.locale('pt-br');
const dateFormat = 'D [de] MMM [às] HH:mm';

const EventFormDiscountLists = ({
  form: { setFieldValue, values: { discountLists } },
  classes,
}) => {
  const addDiscountList = () =>
    setFieldValue('discountLists', [...discountLists, {}]);

  const removeDiscountList = idx =>
    setFieldValue('discountLists', discountLists.filter((_, i) => idx !== i));

  const handleDiscountListChange = (e) => {
    const [_index, name] = e.target.name.split(':');
    const index = parseInt(_index, 10);
    setFieldValue('discountLists', discountLists.map((discountList, i) => (
      i !== index ? discountList : { ...discountList, [name]: e.target.value }
    )));
  };

  const handleRegistrationDeadlineChange = (value, index) => {
    setFieldValue('discountLists', discountLists.map((discountList, i) => (
      i !== index ? discountList : { ...discountList, registrationDeadline: value }
    )));
  }

  declare var idx;
  declare var discountList;

  return (
    <div>
      <For each="discountList" of={discountLists} index="idx">
        <div className={classes.discountList} key={idx}>
          <TextField
            name={`${idx}:name`}
            label="Nome"
            value={discountList.name || ''}
            onChange={handleDiscountListChange}
            fullWidth
          />
          <div>
            <DateTimePicker
              label="Data limite"
              cancelLabel="Cancelar"
              value={discountList.registrationDeadline || null}
              onChange={dateTime => handleRegistrationDeadlineChange(dateTime, idx)}
              format={dateFormat}
              ampm={false}
              fullWidth
              autoOk
            />
          </div>
          <Tooltip title="Remover lista">
            <IconButton onClick={() => removeDiscountList(idx)}>
              <Icon>remove_circle_outline</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </For>
      <Button className={classes.addButton} onClick={addDiscountList} color="primary">
        <Icon>add</Icon>
        Adicionar Lista
      </Button>
    </div>
  );
};

EventFormDiscountLists.propTypes = {
  classes: PropTypes.object,
  form: PropTypes.shape({
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
  }),
};

export const validation = {};

export default withDiscountListsStyle(EventFormDiscountLists);
