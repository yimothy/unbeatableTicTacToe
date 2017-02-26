import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../client/components/game.jsx';

it('renders correctly', () => {
  const tree = renderer.create(
    <Game />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
