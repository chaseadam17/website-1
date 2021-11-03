import React from 'react';
import TestRenderer from 'react-test-renderer';
import BlankVoucher from '../../pages/voucher';

describe("BlankVoucher", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(<BlankVoucher />).toJSON();
    expect(rendered).toMatchSnapshot()
  });
});