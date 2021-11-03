import React from 'react';
import TestRenderer from 'react-test-renderer';
import TWCenteredContent from '../../components/TWCenteredContent';

describe("TWCenteredContent", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<TWCenteredContent />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});