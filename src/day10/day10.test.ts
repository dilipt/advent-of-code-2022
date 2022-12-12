import path from 'path';
import fs from 'fs';
import { part1, part2 } from './day10';

describe('aoc day 10', () => {
  it('should return numbers for test data set 2', () => {
    const inputs = fs.readFileSync(path.join(__dirname, 'testinput.txt')).toString().split('\n');
    expect(part1(inputs)).toEqual(13140);
  });

  it('should return right answer for real data', () => {
    const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
    expect(part1(inputs)).toEqual(14780);
  });

  it('should render test data', () => {
    const inputs = fs.readFileSync(path.join(__dirname, 'testinput.txt')).toString().split('\n');
    const display = part2(inputs);

    const render = display.reduce((draw: string, line) => draw + line.join('') + '\n', '');

    console.log(render);
  });

  it('should render real data', () => {
    const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
    const display = part2(inputs);

    const render = display.reduce((draw: string, line) => draw + line.join('') + '\n', '');

    console.log(render);
  });
});
