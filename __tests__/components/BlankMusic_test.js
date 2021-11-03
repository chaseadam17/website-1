import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankMusic from '../../components/BlankMusic';

describe("BlankMusic", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankMusic />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});