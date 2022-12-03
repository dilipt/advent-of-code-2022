import fs from 'fs';
import path from 'path';

export function prioritySum(): number {
  return fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .reduce((priority: number, rucksack) => {
      const firstUnique = [...new Set(rucksack.slice(0, rucksack.length / 2).split(''))];
      const secondUnique = [...new Set(rucksack.slice(rucksack.length / 2, rucksack.length).split(''))];
      const [itemInBoth] = firstUnique.filter(item => secondUnique.includes(item));
      return priority + itemInBoth.toUpperCase().charCodeAt(0) - 64 + (itemInBoth.toUpperCase() === itemInBoth ? 26 : 0);
    }, 0);
}

export function badgePrioritySum(): number {
  const rucksacks = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  let prioritySum = 0;
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    const rucksack1UniqueItems = [...new Set(rucksacks[i].split(''))];
    const rucksack2UniqueItems = [...new Set(rucksacks[i + 1].split(''))];
    const rucksack3UniqueItems = [...new Set(rucksacks[i + 2].split(''))];

    const [badge] = rucksack1UniqueItems.filter(item => rucksack2UniqueItems.includes(item) && rucksack3UniqueItems.includes(item));
    prioritySum += badge.toUpperCase().charCodeAt(0) - 64 + (badge.toUpperCase() === badge ? 26 : 0);
  }

  return prioritySum;
}
