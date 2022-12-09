import fs from 'fs';
import path from 'path';

export function part1(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');

  const forestWidth = input[0].length;
  const forestHeight = input.length;
  const forest = input.map(treeline => treeline.split('').map(tree => parseInt(tree, 10)));

  const treeRowFor = (row: number): number[] => forest[row];
  const treeColFor = (col: number): number[] => forest.flatMap(row => row[col]);

  let visibleTrees = (forestWidth * 2) + ((forestHeight - 2) * 2); // outer edges
  for (let row = 1; row < input[0].length - 1; row++) {
    for (let col = 1; col < input.length - 1; col++) {
      const currentTree = forest[row][col];
      const treeRow = treeRowFor(row);
      const treeCol = treeColFor(col);
      const smallerTreesEast = treeRow.slice(col + 1, treeRow.length).every(tree => tree < currentTree);
      const smallerTreesWest = treeRow.slice(0, col).every(tree => tree < currentTree);
      const smallerTreesNorth = treeCol.slice(0, row).every(tree => tree < currentTree);
      const smallerTreesSouth = treeCol.slice(row + 1, treeCol.length).every(tree => tree < currentTree);

      if (smallerTreesEast || smallerTreesWest || smallerTreesNorth || smallerTreesSouth) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
}

export function part2(): number {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const forest = input.map(treeline => treeline.split('').map(tree => parseInt(tree, 10)));

  const treeRowFor = (row: number): number[] => forest[row];
  const treeColFor = (col: number): number[] => forest.flatMap(row => row[col]);
  const scenicScoreFor = (tree: number, treeLine: number[]): number => {
    let score = 0;
    for (let i = 0; i < treeLine.length; i++) {
      score++;
      if (treeLine[i] >= tree) {
        break;
      }
    }
    return score;
  };

  let highestScenicScore = 0;

  for (let row = 1; row < input[0].length - 1; row++) {
    for (let col = 1; col < input.length - 1; col++) {
      const tree = forest[row][col];
      const treeRow = treeRowFor(row);
      const treeCol = treeColFor(col);

      const eastScenicScore = scenicScoreFor(tree, treeRow.slice(col + 1, treeRow.length));
      const westScenicScore = scenicScoreFor(tree, treeRow.slice(0, col).reverse());
      const northScenicScore = scenicScoreFor(tree, treeCol.slice(0, row).reverse());
      const southScenicScore = scenicScoreFor(tree, treeCol.slice(row + 1, treeCol.length));

      const scenicScore = eastScenicScore * westScenicScore * northScenicScore * southScenicScore;

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  return highestScenicScore;
}
