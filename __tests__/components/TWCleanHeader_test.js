import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWCleanHeader from '../../components/TWCleanHeader';

describe("TWCleanHeader", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWCleanHeader />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});