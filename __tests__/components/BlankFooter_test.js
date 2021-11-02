import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankFooter from '../../components/BlankFooter';

describe("BlankFooter", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankFooter />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});