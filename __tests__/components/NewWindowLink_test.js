import React from 'react';
import TestRenderer from 'react-test-renderer';
import NewWindowLink from '../../components/NewWindowLink';

describe("NewWindowLink", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<NewWindowLink />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});