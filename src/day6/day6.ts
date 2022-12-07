import fs from 'fs';
import path from 'path';

export function findBeginningSequence(messageSize: number): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
  for (let i = 0; i < input.length - messageSize - 1; i++) {
    const sequence = input.slice(i, i + messageSize);
    if ([...new Set(sequence)].join('').length === messageSize) {
      return i + messageSize;
    }
  }
  return -1;
}
