import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../client/components/game.jsx';
import Board from '../client/components/board.jsx';
import Square from '../client/components/square.jsx';

// Test components to render correctly
it('Game renders correctly', () => {
  const tree = renderer.create(
    <Game />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Board renders correctly', () => {
  const board = [['X', false, 'O'],
                 [false, 'X', false],
                 ['O', false, 'X']]
  const winningSquares = [[0, 0], [1, 1], [2, 2]];
  const tree = renderer.create(
    <Board board={board} winningSquares={winningSquares} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Square renders correctly', () => {
  const value = 'X';
  const tree = renderer.create(
    <Square value={value} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
