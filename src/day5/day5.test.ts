import { crane9001, moveCrates } from './day5';

describe('aoc day 5', () => {
  it('should do part 1', () => {
    expect(moveCrates()).toEqual('RNZLFZSJH');
  });

  it('should do part 2', () => {
    expect(crane9001()).toEqual('CNSFCGJSM');
  });
});
