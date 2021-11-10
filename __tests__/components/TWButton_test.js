import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWButton from '../../components/TWButton';

describe("TWButton", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWButton />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});