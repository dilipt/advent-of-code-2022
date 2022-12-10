import { findRopePositions, findTenPieceRopePositions } from './day9';

describe('aoc day 9', () => {
  it('should do part1', () => {
    expect(findRopePositions()).toEqual(6486);
  });

  it('should do part 2', () => {
    console.log(findTenPieceRopePositions());
  });
});
