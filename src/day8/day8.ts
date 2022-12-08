import fs from 'fs';
import path from 'path';

export function part1(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');

  const forestWidth = input[0].length;
  const forestHeight = input.length;
  const forest = input.map(treeline => treeline.split(''));

  const treeRowFor = (i: number, j: number): number[] => forest[i].map(tree => parseInt(tree, 10));
  const treeColFor = (i: number, j: number): number[] => forest.flatMap(row => parseInt(row[j], 10));

  let visibleTrees = (forestWidth * 2) + ((forestHeight - 2) * 2); // outer edges
  for (let row = 1; row < input[0].length - 1; row++) {
    for (let col = 1; col < input.length - 1; col++) {
      const tree = parseInt(forest[row][col], 10);
      const treeRow = treeRowFor(row, col);
      const treeCol = treeColFor(row, col);
      const smallerTreesEast = treeRow.filter((currTree, idx) => (idx > col) && (currTree >= tree)).length === 0;
      const smallerTreesWest = treeRow.filter((currTree, idx) => (idx < col) && (currTree >= tree)).length === 0;
      const smallerTreesNorth = treeCol.filter((currTree, idx) => (idx < row) && (currTree >= tree)).length === 0;
      const smallerTreesSouth = treeCol.filter((currTree, idx) => (idx > row) && (currTree >= tree)).length === 0;

      if (smallerTreesEast || smallerTreesWest || smallerTreesNorth || smallerTreesSouth) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
}

export function part2(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const forest = input.map(treeline => treeline.split(''));

  const treeRowFor = (row: number): number[] => forest[row].map(tree => parseInt(tree, 10));
  const treeColFor = (col: number): number[] => forest.flatMap(row => parseInt(row[col], 10));
  const scenicScoreFor = (tree: number, treeLine: number[]): number => {
    let score = 0;
    for (let i = 0; i < treeLine.length; i++) {
      if (treeLine[i] < tree) {
        score++;
      } else {
        score++;
        break;
      }
    }
    return score;
  };

  let highestScenicScore = 0;

  for (let row = 1; row < input[0].length - 1; row++) {
    for (let col = 1; col < input.length - 1; col++) {
      const tree = parseInt(forest[row][col], 10);
      const treeRow = treeRowFor(row);
      const treeCol = treeColFor(col);

      const eastScenicScore = scenicScoreFor(tree, treeRow.filter((_, idx) => (idx > col)));
      const westScenicScore = scenicScoreFor(tree, treeRow.filter((_, idx) => (idx < col)).reverse());
      const northScenicScore = scenicScoreFor(tree, treeCol.filter((_, idx) => (idx < row)).reverse());
      const southScenicScore = scenicScoreFor(tree, treeCol.filter((_, idx) => (idx > row)));

      const scenicScore = eastScenicScore * westScenicScore * northScenicScore * southScenicScore;

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  return highestScenicScore;
}
