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

  addFile(f: File): void {
    this.files = [...this.files, f];
  }

  addDir(d: Directory): void {
    this.subdirs = [...this.subdirs, d];
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
  let i = 1;
  while (i < input.length) {
    const line = input[i];
    if (line.startsWith('$ ls')) {
      let j = i + 1;
      let k = 1;
      while (input[j] !== undefined && !input[j].startsWith('$')) {
        if (/^dir.*/.test(input[j])) {
          const dir = new Directory(input[j].split(' ')[1], currentDir);
          currentDir.addDir(dir);
        } else if (/^\d+/.test(input[j])) {
          const file = new File(input[j].split(' ')[1], parseInt(input[j].split(' ')[0], 10));
          currentDir.addFile(file);
        }
        j++;
        k++;
      }
      i = i + k;
    } else if (line.startsWith('$ cd')) {
      const cdDirName = line.split(' ')[2];
      if (cdDirName !== '..') {
        const cdResult = currentDir.subdirs.find(dir => dir.name === cdDirName);
        if (cdResult === undefined) throw Error(`directory not found: ${cdDirName}`);
        currentDir = cdResult;
      } else {
        if (currentDir.parent === null) throw Error(`directory ${currentDir.name} has no parent`);
        currentDir = currentDir.parent;
      }
      i++;
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

  const totalSize = directory.sum();
  const freeSpace = 70000000 - totalSize;
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
