import React from 'react';
import TestRenderer from 'react-test-renderer';
import voucher from '../../pages/voucher';

describe("voucher", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<voucher />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});