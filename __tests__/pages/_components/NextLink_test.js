import React from 'react';
import TestRenderer from 'react-test-renderer';
import NextLink from '../../../pages/_components/NextLink';

describe("NextLink", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<NextLink />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});