import path from 'path';
import fs from 'fs';

export function topN(n: number = 3): number {
  return fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n\n')
    .reduce((calorieCount: number[], calorieStr) =>
      [
        ...calorieCount,
        calorieStr
          .split('\n')
          .map(cal => parseInt(cal, 10))
          .reduce((acc, curr) => acc + curr, 0)
      ], [])
    .sort((a, b) => b - a)
    .slice(0, n)
    .reduce((acc, curr) => acc + curr, 0);
}
