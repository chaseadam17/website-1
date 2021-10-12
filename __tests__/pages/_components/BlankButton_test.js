import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankButton from '../../../pages/_components/BlankButton';

describe("BlankButton", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankButton />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});