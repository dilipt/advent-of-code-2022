import { findOverlappingSections, findAnyOverlaps } from './day4';

describe('aoc day 4', () => {
  it('step 1', () => {
    expect(findOverlappingSections()).toEqual(494);
  });

  it('step 2', () => {
    expect(findAnyOverlaps()).toEqual(833);
  });
});
