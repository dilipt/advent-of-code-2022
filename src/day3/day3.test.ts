import { badgePrioritySum, prioritySum } from './day3';

describe('aoc day 3', () => {
  it('should sum priorities', () => {
    expect(prioritySum()).toEqual(7766);
  });

  it('should sum badge priorities', () => {
    expect(badgePrioritySum()).toEqual(2415);
  });
});
