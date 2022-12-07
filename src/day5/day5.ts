import fs from 'fs';
import path from 'path';

export function moveCrates(): string {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

  const stackList = input.slice(0, input.indexOf(' 1') - 1).split('\n');
  const moveList = input.slice(input.indexOf('\n\n') + 2, input.length).split('\n');

  const stacks = [...new Array((stackList[0].length + 1) / 4).keys()]
    .map(() => [] as string[]);

  for (const row of stackList) {
    for (let i = 0, j = 0; i < stackList[0].length; i += 4, j++) {
      const crate = row.slice(i, i + 4).replace(/\W/g, '');
      if (crate.length > 0) {
        stacks[j].push(crate);
      }
    }
  }

  for (const move of moveList) {
    const [numberOfCratesToMove, fromStack, toStack] = move.split(' ')
      .reduce((moveSet: number[], str) => /\d+/.test(str) ? [...moveSet, parseInt(str, 10)] : moveSet, []);

    for (let i = 0; i < numberOfCratesToMove; i++) {
      const crateToMove = stacks[fromStack - 1].shift();
      if (crateToMove != null) {
        stacks[toStack - 1].unshift(crateToMove);
      }
    }
  }

  return stacks.flatMap((stack) => stack[0]).join('');
}

export function crane9001(): string {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

  const stackList = input.slice(0, input.indexOf(' 1') - 1).split('\n');
  const moveList = input.slice(input.indexOf('\n\n') + 2, input.length).split('\n');

  const stacks = [...new Array((stackList[0].length + 1) / 4).keys()]
    .map(() => [] as string[]);

  for (const row of stackList) {
    for (let i = 0, j = 0; i < stackList[0].length; i += 4, j++) {
      const crate = row.slice(i, i + 4).replace(/\W/g, '');
      if (crate.length > 0) {
        stacks[j].push(crate);
      }
    }
  }

  for (const move of moveList) {
    const [numberOfCratesToMove, fromStack, toStack] = move.split(' ')
      .reduce((moveSet: number[], str) => /\d+/.test(str) ? [...moveSet, parseInt(str, 10)] : moveSet, []);

    const miniStack = [];
    for (let i = 0; i < numberOfCratesToMove; i++) {
      const crateToMove = stacks[fromStack - 1].shift();
      if (crateToMove != null) {
        miniStack.push(crateToMove);
      }
    }
    stacks[toStack - 1] = miniStack.concat(stacks[toStack - 1]);
  }

  return stacks.map((stack) => stack[0]).join('');
}
