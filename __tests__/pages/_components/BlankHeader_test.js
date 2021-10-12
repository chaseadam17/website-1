import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankHeader from '../../../pages/components/BlankHeader';

describe("BlankHeader", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankHeader />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});