import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankMinting from '../../pages/mint';

describe("BlankMinting", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankMinting />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});