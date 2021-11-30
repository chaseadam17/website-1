// This is a test of the BlankIndex component.
// It is the top level component so it is rendered as the index page.
import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankIndex from '../../pages/index';

describe("BlankIndex", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankIndex />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});