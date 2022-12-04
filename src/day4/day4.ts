import fs from 'fs';
import path from 'path';

export function findOverlappingSections(): number {
  const sections = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  let count = 0;
  for (const section of sections) {
    const [section1, section2] = section.split(',').map((section) => {
      const [min, max] = section.split('-').map(ch => parseInt(ch, 10));
      return [...Array(max - min + 1).keys()].map((_, i) => i + min);
    });
    if (section1.length >= section2.length) {
      if (section2.every(campId => section1.includes(campId))) {
        count++;
      }
    } else {
      if (section1.every(campId => section2.includes(campId))) {
        count++;
      }
    }
  }
  return count;
}

export function findAnyOverlaps(): number {
  const sections = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  let count = 0;
  for (const section of sections) {
    const [section1, section2] = section.split(',').map((section) => {
      const [min, max] = section.split('-').map(ch => parseInt(ch, 10));
      return [...Array(max - min + 1).keys()].map((_, i) => i + min);
    });
    if (section1.some(campId => section2.includes(campId))) {
      count++;
    }
  }
  return count;
}
