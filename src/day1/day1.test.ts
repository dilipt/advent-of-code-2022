import { maxCalories, topN } from './day1';

describe('aoc day 1', () => {
  it('should return hello world', () => {
    expect(topN(1)).toEqual(65912);
  });

  it('should return top three', () => {
    expect(topN()).toEqual(195625);
  })
});
