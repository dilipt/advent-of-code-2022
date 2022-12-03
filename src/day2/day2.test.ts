import { calculateScore, calculateStrategicScore } from './day2';
describe('day 2 aoc', () => {
  it('should calculate score', () => {
    expect(calculateScore()).toEqual(12586);
  });

  it('should calculate score using elfish strategy', () => {
    expect(calculateStrategicScore()).toEqual(13193);
  });
});
