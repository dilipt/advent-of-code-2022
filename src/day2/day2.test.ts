import { calculateScore, calculateStrategicScore } from './day2';
describe('day 2 aoc', () => {
  it('should solve the problem', () => {
    expect(calculateScore()).toEqual(12586);
  });

  it('should solve the next problem', () => {
    expect(calculateStrategicScore()).toEqual(13193);
  })
});
