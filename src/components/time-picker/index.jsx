import React, { PropTypes } from 'react';
import moment from 'moment';
import { Dropdown } from 'semantic-ui-react';

const addZero = number => `${number < 10 ? '0' : ''}${number}`;
const timeChanger = (time, unit, cb) => (_, { value }) => cb(moment(time).set(unit, value));

const hours = [...Array(24)].map((_, i) => ({ text: addZero(i), value: i }));
const minutes = [...Array(60)].map((_, i) => ({ text: addZero(i), value: i }));

const TimePicker = ({ className, onChange, time = moment() }) => (
  <span className={`TimePicker ${className}`}>
    <Dropdown
      {...{ [onChange ? 'value' : 'defaultValue']: time.get('hour') }}
      icon={null}
      onChange={onChange && timeChanger(time, 'hour', onChange)}
      options={hours}
      scrolling
      inline
    />
    <span>:</span>
    <Dropdown
      {...{ [onChange ? 'value' : 'defaultValue']: time.get('minute') }}
      icon={null}
      onChange={onChange && timeChanger(time, 'minute', onChange)}
      options={minutes}
      scrolling
      inline
    />
  </span>
);

TimePicker.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  time: PropTypes.object,
};

export default TimePicker;
