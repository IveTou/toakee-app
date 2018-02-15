import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Chip } from 'material-ui';
import { reject } from 'lodash';

import CategoriesAutocomplete from '~/src/components/categories-autocomplete';

const EventFormDescription = ({
  form: { values, handleChange, setFieldValue },
}) => {
  const { categories } = values;

  const addCategory = category =>
    setFieldValue(
      'categories',
      reject(categories, { title: category.title }).concat([category])
    );

  const removeCategory = idx =>
    setFieldValue('categories', categories.filter((_, i) => idx !== i));

  declare var category;
  declare var idx;

  return (
    <div className="EventFormDescription">
      <TextField
        name="description"
        label="Descrição"
        value={values.description}
        onChange={handleChange}
        fullWidth
        multiline
        rowsMax="20"
      />
      <CategoriesAutocomplete
        name="categories"
        label="Selecione as categorias"
        margin="normal"
        onSelect={addCategory}
        clearOnSelect
        fullWidth
      />
      <div className="EventFormDescription-categories">
        <For each="category" of={values.categories} index="idx">
          <Chip
            className="EventFormDescription-categories-chip"
            onDelete={() => removeCategory(idx)}
            key={idx}
            label={category.title}
          />
        </For>
      </div>
    </div>
  );
};

EventFormDescription.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
  }),
};

export default EventFormDescription;
