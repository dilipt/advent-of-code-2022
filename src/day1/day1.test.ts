import { hello } from './day1';

describe('aoc day 1', () => {
  it('should return hello world', () => {
    expect(hello()).toEqual('hello world');
  });
});
