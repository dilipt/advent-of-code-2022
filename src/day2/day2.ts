import path from 'path';
import fs from 'fs';

const scores: Record<string, number> = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

const trumps: Record<string, string> = {
  A: 'Z',
  B: 'X',
  C: 'Y',
  X: 'C',
  Y: 'A',
  Z: 'B',
}

export function calculateScore() {
  const turns = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  let myScore = 0;

  for (const turn of turns) {
    const [opponentPlay, myPlay] = turn.split(' ');
    if (trumps[opponentPlay] === myPlay) {
      myScore += scores[myPlay];
    } else if (trumps[myPlay] === opponentPlay) {
      myScore += (6 + scores[myPlay]);
    } else {
      myScore += (3 + scores[myPlay]);
    }
  }

  return myScore;
}

const toLose: Record<string, string> = {
  A: 'C',
  B: 'A',
  C: 'B',
}

const toWin: Record<string, string> = {
  A: 'B',
  B: 'C',
  C: 'A',
}

export function calculateStrategicScore() {
  const turns = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  let myScore = 0;

  for (const turn of turns) {
    const [opponentPlay, myPlay] = turn.split(' ');
    if (myPlay === 'X') { // need to lose
      myScore += scores[toLose[opponentPlay]];
    } else if (myPlay === 'Y') { // need to draw
      myScore += (3 + scores[opponentPlay]);
    } else { // need to win
      myScore += (6 + scores[toWin[opponentPlay]]);
    }
  }

  return myScore;
}