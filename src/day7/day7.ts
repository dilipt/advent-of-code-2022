import path from 'path';
import fs from 'fs';

class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  name: string;
  files: File[];
  parent: Directory | null;
  subdirs: Directory[];

  constructor(name: string, parent: Directory | null) {
    this.name = name;
    this.parent = parent;
    this.files = [];
    this.subdirs = [];
  }

  sum(): number {
    const subDirSize = this.subdirs.reduce((size: number, currentDir) => size + currentDir.sum(), 0);
    const filesSize = this.files.reduce((size: number, currentFile) => size + currentFile.size, 0);
    return subDirSize + filesSize;
  }
}

function createFileStructure(input: string[]): Directory {
  const top = new Directory('/', null);
  let currentDir: Directory = top;
  for (let i = 1; i < input.length; i++) {
    const line = input[i];
    if (line.startsWith('$ cd')) {
      const cdDirName = line.split(' ')[2];
      if (cdDirName === '..') {
        if (currentDir.parent === null) throw Error(`directory ${currentDir.name} has no parent`);
        currentDir = currentDir.parent;
      } else {
        const cdResult = currentDir.subdirs.find(dir => dir.name === cdDirName);
        if (cdResult === undefined) throw Error(`directory not found: ${cdDirName}`);
        currentDir = cdResult;
      }
    } else {
      if (/^dir.*/.test(input[i])) {
        currentDir.subdirs.push(new Directory(input[i].split(' ')[1], currentDir));
      } else if (/^\d+/.test(input[i])) {
        currentDir.files.push(new File(input[i].split(' ')[1], parseInt(input[i].split(' ')[0], 10)));
      }
    }
  }

  return top;
}

export function part1(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const directory = createFileStructure(input);

  function recursiveSum(currentSubDir: Directory): number {
    let sum = 0;
    if (currentSubDir.subdirs.length > 0) {
      for (const subdir of currentSubDir.subdirs) {
        sum += recursiveSum(subdir);
      }
    }
    if (currentSubDir.sum() < 100000) {
      return sum + currentSubDir.sum();
    } else {
      return sum;
    }
  }

  return recursiveSum(directory);
}

export function part2(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const directory = createFileStructure(input);

  const freeSpace = 70000000 - directory.sum();
  const minimumRequired = 30000000 - freeSpace;

  function smallestDirectory(dir: Directory, currentClosest: number): number {
    if (dir.subdirs.length > 0) {
      for (const subdir of dir.subdirs) {
        currentClosest = smallestDirectory(subdir, currentClosest);
      }
    }
    if (dir.sum() >= minimumRequired && dir.sum() < currentClosest) {
      return dir.sum();
    } else {
      return currentClosest;
    }
  }

  return smallestDirectory(directory, 70000000);
}
