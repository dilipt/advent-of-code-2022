import path from 'path';
import fs from 'fs';

type MyHand = 'X' | 'Y' | 'Z';
type OpponentHand = 'A' | 'B' | 'C';
type Hand = MyHand | OpponentHand;

const scores: Record<Hand, number> = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
} as const;

export function calculateScore(): number {
  const trumps: Record<Hand, Hand> = {
    A: 'Z',
    B: 'X',
    C: 'Y',
    X: 'C',
    Y: 'A',
    Z: 'B',
  } as const;

  return fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .reduce((score: number, turn) => {
      const [opponentPlay, myPlay] = turn.split(' ') as [OpponentHand, MyHand];
      if (trumps[opponentPlay] === myPlay) {
        return score + scores[myPlay];
      } else if (trumps[myPlay] === opponentPlay) {
        return score + (6 + scores[myPlay]);
      } else {
        return score + (3 + scores[myPlay]);
      }
    }, 0);
}

export function calculateStrategicScore(): number {
  const toLose: Record<OpponentHand, OpponentHand> = {
    A: 'C',
    B: 'A',
    C: 'B',
  } as const;

  const toWin: Record<OpponentHand, OpponentHand> = {
    A: 'B',
    B: 'C',
    C: 'A',
  } as const;

  return fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .reduce((score: number, turn) => {
      const [opponentPlay, myPlay] = turn.split(' ') as [OpponentHand, MyHand];
      if (myPlay === 'X') { // need to lose
        return score + scores[toLose[opponentPlay]];
      } else if (myPlay === 'Y') { // need to draw
        return score + (3 + scores[opponentPlay]);
      } else { // Z, need to win
        return score + (6 + scores[toWin[opponentPlay]]);
      }
    }, 0);
}
