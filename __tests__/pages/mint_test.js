import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankMinting from '../../pages/BlankMinting';

describe("BlankMinting", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankMinting />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});