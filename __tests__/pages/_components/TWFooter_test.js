import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWFooter from '../../../pages/_components/TWFooter';

describe("TWFooter", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWFooter />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});