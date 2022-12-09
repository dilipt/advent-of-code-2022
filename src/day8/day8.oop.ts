import fs from 'fs';
import path from 'path';

class Point {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

class Tree {
  height: number;

  constructor(height: number) {
    this.height = height;
  }
}

class Forest {
  trees: Tree[][];

  constructor(input: string[]) {
    this.trees = input.map(treeline => treeline.split('').map(tree => new Tree(parseInt(tree, 10))));
  }

  get width(): number {
    return this.trees[0].length;
  }

  get height(): number {
    return this.trees.length;
  }

  treeAt(point: Point): Tree {
    return this.trees[point.row][point.col];
  }

  treesEastOf(point: Point): Tree[] {
    const row = this.trees[point.row];
    return row.slice(point.col + 1, row.length);
  }

  treesWestOf(point: Point): Tree[] {
    const row = this.trees[point.row];
    return row.slice(0, point.col).reverse();
  }

  treesNorthOf(point: Point): Tree[] {
    const col = this.trees.flatMap(row => row[point.col]);
    return col.slice(0, point.row).reverse();
  }

  treesSouthOf(point: Point): Tree[] {
    const col = this.trees.flatMap(row => row[point.col]);
    return col.slice(point.row + 1, col.length);
  }

  scenicScoreFor(point: Point): number {
    const easterlyScenicScore = this.calculateScenicScore(point, this.treesEastOf(point));
    const westerlyScenicScore = this.calculateScenicScore(point, this.treesWestOf(point));
    const northerlyScenicScore = this.calculateScenicScore(point, this.treesNorthOf(point));
    const southerlyScenicScore = this.calculateScenicScore(point, this.treesSouthOf(point));
    return easterlyScenicScore * westerlyScenicScore * northerlyScenicScore * southerlyScenicScore;
  }

  private calculateScenicScore(point: Point, treeline: Tree[]): number {
    const tree = this.treeAt(point);
    let score = 0;
    for (let i = 0; i < treeline.length; i++) {
      score++;
      if (treeline[i].height >= tree.height) {
        break;
      }
    }
    return score;
  }
}

export function part1OOPStyle(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const forest = new Forest(input);

  let visibleTrees = (forest.width * 2) + ((forest.height - 2) * 2);

  for (let row = 1; row < forest.height - 1; row++) {
    for (let col = 1; col < forest.width - 1; col++) {
      const point = new Point(row, col);
      const currentTree = forest.treeAt(point);
      if (
        forest.treesEastOf(point).every(tree => currentTree.height > tree.height) ||
        forest.treesWestOf(point).every(tree => currentTree.height > tree.height) ||
        forest.treesNorthOf(point).every(tree => currentTree.height > tree.height) ||
        forest.treesSouthOf(point).every(tree => currentTree.height > tree.height)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

export function part2OOPStyle(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const forest = new Forest(input);

  let highestScenicScore = 0;

  for (let row = 1; row < forest.height - 1; row++) {
    for (let col = 1; col < forest.width - 1; col++) {
      const point = new Point(row, col);
      const currentScenicScore = forest.scenicScoreFor(point);
      if (highestScenicScore < forest.scenicScoreFor(point)) {
        highestScenicScore = currentScenicScore;
      }
    }
  }

  return highestScenicScore;
}
