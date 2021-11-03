import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWFullScreen from '../../components/TWFullScreen';

describe("TWFullScreen", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWFullScreen />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});