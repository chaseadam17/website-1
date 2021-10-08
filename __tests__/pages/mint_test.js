import React from 'react';
import TestRenderer from 'react-test-renderer';
import mint from '../../pages/mint';

describe("mint", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<mint />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});