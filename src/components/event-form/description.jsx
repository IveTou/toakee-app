import React, { PropTypes } from 'react';
import { TextField, Chip } from 'material-ui';
import { trim, reject } from 'lodash';

import CategoriesAutocomplete from '~/src/components/categories-autocomplete';

const EventFormDescription = ({
  form: { values, handleChange, setFieldValue },
}) => {
  const { categories } = values;
  const addCategory = (_category) => {
    const category = _category.id === -1
      ? { title: trim(_category.title.slice(10)) }
      : _category;
    setFieldValue('categories', [...reject(categories, { title: category.title }), category]);
  };
  const removeCategory = idx =>
    setFieldValue('categories', [...categories.slice(0, idx), ...categories.slice(idx + 1)]);

  declare var category;
  declare var idx;

  return (
    <div className="EventFormDescription">
      <TextField
        name="description"
        floatingLabelText="Descrição"
        value={values.description}
        onChange={handleChange}
        fullWidth
        multiLine
      />
      <CategoriesAutocomplete
        name="categories"
        placeholder="Selecione as categorias"
        onSelect={addCategory}
        clearOnSelect
      />
      <div className="EventFormDescription-categories">
        <For each="category" of={values.categories} index="idx">
          <Chip
            className="EventFormDescription-categories-chip"
            onRequestDelete={() => removeCategory(idx)}
            key={idx}
          >
            {category.title}
          </Chip>
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

export const validation = {};

export default EventFormDescription;
