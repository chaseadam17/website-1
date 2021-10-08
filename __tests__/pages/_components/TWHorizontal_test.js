import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWHorizontal from '../../../pages/_components/TWHorizontal';

describe("TWHorizontal", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWHorizontal />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});