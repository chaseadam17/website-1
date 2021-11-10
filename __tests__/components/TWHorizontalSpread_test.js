import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWHorizontalSpread from '../../components/TWHorizontalSpread';

describe("TWHorizontalSpread", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWHorizontalSpread />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});