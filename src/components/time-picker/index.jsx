/* eslint-disable jsx-a11y/label-has-for */

import React, { PropTypes } from 'react';
import moment from 'moment';

if (process.env.BROWSER) {
  require('./style.scss');
}

const addZero = number => `${number < 10 ? '0' : ''}${number}`;
const timeChanger = (time, unit, cb) => e => cb(moment(time).set(unit, e.target.value));

declare var minuteValue;
declare var hourValue;

const TimePicker = ({ className, label, onChange, time = moment() }) => (
  <span className={`TimePicker Input ${className}`}>
    <If condition={label}>
      <label className="TimePicker-label">{label}</label>
    </If>
    <span className="TimePicker-time">
      <select
        {...{ [onChange ? 'value' : 'defaultValue']: time.get('hour') }}
        onChange={onChange && timeChanger(time, 'hour', onChange)}
      >
        <For each="hourValue" of={[...Array(24).keys()]}>
          <option key={hourValue} value={hourValue}>{addZero(hourValue)}</option>
        </For>
      </select>
      <span>:</span>
      <select
        {...{ [onChange ? 'value' : 'defaultValue']: time.get('minute') }}
        onChange={onChange && timeChanger(time, 'minute', onChange)}
      >
        <For each="minuteValue" of={[...Array(60).keys()]}>
          <option key={minuteValue} value={minuteValue}>{addZero(minuteValue)}</option>
        </For>
      </select>
    </span>
  </span>
);

TimePicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any,
  onChange: PropTypes.func,
  time: PropTypes.object,
};

export default TimePicker;
