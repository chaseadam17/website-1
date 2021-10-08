// This is a test of the BlankIndex component.
// It is the top level component so it is rendered as the index page.
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Index from '../../pages/index';

describe("Index", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<Index />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});