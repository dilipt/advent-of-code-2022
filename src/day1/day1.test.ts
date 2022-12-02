import { topN } from './day1';

describe('aoc day 1', () => {
  it('should return top score', () => {
    expect(topN(1)).toEqual(65912);
  });

  it('should return top three scores', () => {
    expect(topN()).toEqual(195625);
  })
});
