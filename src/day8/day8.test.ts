import { part1, part2 } from './day8';
import { part1OOPStyle, part2OOPStyle } from './day8.oop';

describe('aoc day 8', () => {
  it('should do part 1', () => {
    expect(part1()).toEqual(1829);
  });

  it('should do part 2', () => {
    expect(part2()).toEqual(291840);
  });

  it('should do part 1 OOP style', () => {
    expect(part1OOPStyle()).toEqual(1829);
  });

  it('should do part 2 OOP style', () => {
    expect(part2OOPStyle()).toEqual(291840);
  });
});
