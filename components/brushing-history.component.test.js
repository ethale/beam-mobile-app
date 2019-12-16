import React from 'react';
import renderer from 'react-test-renderer';
import BrushingHstoryComponent from '../components/member.component';

it('renders correctly', () => {
  const entry = renderer.create(
    <BrushingHstoryComponent />
    ).toJSON();
  expect(entry).toMatchSnapshot();
});
