import { findBeginningSequence } from './day6';

describe('aoc day 6', () => {
  it('should part one', () => {
    expect(findBeginningSequence(4)).toEqual(1850);
  });

  it('should do part two', () => {
    expect(findBeginningSequence(14)).toEqual(2823);
  });
});
