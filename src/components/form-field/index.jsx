import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  FormControl,
  InputLabel,
  Icon,
  Input,
  FormHelperText,
  withStyles,
} from 'material-ui';

const FormField = ({
  classes, className, fullWidth, margin, label, icon, error, ...inputProps
}) => (
  <div className={classNames(classes.formField, className)}>
    <If condition={icon}>
      <Icon className={classes.formFieldIcon}>{icon}</Icon>
    </If>
    <FormControl fullWidth={fullWidth} margin={margin}>
      <InputLabel error={!!error}>{label}</InputLabel>
      <Input error={!!error} {...inputProps} />
      <FormHelperText error={!!error}>{error || ' '}</FormHelperText>
    </FormControl>
  </div>
);

const styles = theme => ({
  formField: {
    display: 'flex',
    alignItems: 'baseline',
  },
  formFieldIcon: {
    paddingBottom: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
    alignSelf: 'flex-end',
  },
});

FormField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  classes: PropTypes.object,
  icon: PropTypes.string,
  error: PropTypes.string,
};

export default withStyles(styles)(FormField);

