import React from 'react';
import renderer from 'react-test-renderer';
import MemberComponent from '../components/member.component';

it('renders correctly', () => {
  const member = renderer.create(
    <MemberComponent />
    ).toJSON();
  expect(member).toMatchSnapshot();
});
