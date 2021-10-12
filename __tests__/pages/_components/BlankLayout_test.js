import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankLayout from '../../../pages/components/BlankLayout';

describe("BlankLayout", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankLayout />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});