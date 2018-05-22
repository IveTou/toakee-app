import React from 'react';
import { shallow } from 'enzyme';

export const buildSnapshotAssertion = Component => props => {
  const component = shallow(<Component {...props} />);
  expect(component).toMatchSnapshot();
}

export const buildShallowRenderer = Component => props =>
  shallow(<Component {...props} />);

export const buildJssClassNames = names =>
  names.reduce((obj, name) => ({ ...obj, [name]: `${name}-class` }), {});
