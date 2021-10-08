import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWFlex from '../../../pages/_components/TWFlex';

describe("TWFlex", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWFlex />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});