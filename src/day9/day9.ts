import fs from 'fs';
import path from 'path';

type Direction = 'R' | 'U' | 'D' | 'L';

class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get label(): string {
    return `(${this.x},${this.y})`;
  }
}

class Head {
  current: Position;
  history: Set<string>;

  constructor() {
    const startPosition = new Position(0, 0);
    this.current = startPosition;
    this.history = new Set();
    this.history.add(startPosition.label);
  }

  move(direction: Direction): void {
    let newPosition: Position;
    switch (direction) {
      case 'R': {
        newPosition = new Position(this.current.x + 1, this.current.y);
        break;
      }
      case 'D': {
        newPosition = new Position(this.current.x, this.current.y - 1);
        break;
      }
      case 'L': {
        newPosition = new Position(this.current.x - 1, this.current.y);
        break;
      }
      case 'U': {
        newPosition = new Position(this.current.x, this.current.y + 1);
        break;
      }
    }
    this.current = newPosition;
    this.history.add(newPosition.label);
  }
}

class Tail {
  current: Position;
  history: Set<string>;

  constructor() {
    this.current = new Position(0, 0);
    this.history = new Set();
    this.history.add(this.current.label);
  }

  move(head: Position): void {
    let newPosition: Position | undefined;
    if (this.isFarEnoughFrom(head)) {
      if (head.x === this.current.x - 2) { // left
        if (head.y === this.current.y) { // left left
          newPosition = new Position(this.current.x - 1, this.current.y);
        } else if (head.y === this.current.y - 1) { // down left
          newPosition = new Position(this.current.x - 1, this.current.y - 1);
        } else { // up left
          newPosition = new Position(this.current.x - 1, this.current.y + 1);
        }
      } else if (head.x === this.current.x + 2) { // right
        if (head.y === this.current.y) { // right right
          newPosition = new Position(this.current.x + 1, this.current.y);
        } else if (head.y === this.current.y - 1) { // down right
          newPosition = new Position(this.current.x + 1, this.current.y - 1);
        } else { // up right
          newPosition = new Position(this.current.x + 1, this.current.y + 1);
        }
      } else if (head.y === this.current.y - 2) { // down
        if (head.x === this.current.x) { // down down
          newPosition = new Position(this.current.x, this.current.y - 1);
        } else if (head.x === this.current.x - 1) { // left down
          newPosition = new Position(this.current.x - 1, this.current.y - 1);
        } else { // right down
          newPosition = new Position(this.current.x + 1, this.current.y - 1);
        }
      } else { // up
        if (head.x === this.current.x) { // up up
          newPosition = new Position(this.current.x, this.current.y + 1);
        } else if (head.x === this.current.x - 1) { // left up
          newPosition = new Position(this.current.x - 1, this.current.y + 1);
        } else { // right up
          newPosition = new Position(this.current.x + 1, this.current.y + 1);
        }
      }
    }

    if (newPosition !== undefined) {
      this.current = newPosition;
      this.history.add(newPosition.label);
    }
  }

  isFarEnoughFrom(head: Position): boolean {
    return Math.abs(head.x - this.current.x) > 1 || Math.abs(head.y - this.current.y) > 1;
  }
}

export function findRopePositions(): number {
  const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');
  const head = new Head();
  const tail = new Tail();

  for (const input of inputs) {
    const vector = input.split(' ');
    const direction = vector[0] as Direction;
    const distance = parseInt(vector[1], 10);
    for (let i = 0; i < distance; i++) {
      head.move(direction);
      tail.move(head.current);
    }
  }

  return tail.history.size;
}

export function findTenPieceRopePositions(): number {
  // const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');

  const inputs = [
    'R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20',
  ];

  const head = new Head();
  const body1 = new Tail();
  const body2 = new Tail();
  const body3 = new Tail();
  const body4 = new Tail();
  const body5 = new Tail();
  const body6 = new Tail();
  const body7 = new Tail();
  const body8 = new Tail();
  const tail = new Tail();

  for (const input of inputs) {
    const vector = input.split(' ');
    const direction = vector[0] as Direction;
    const distance = parseInt(vector[1], 10);
    for (let i = 0; i < distance; i++) {
      head.move(direction);
      body1.move(head.current);
      body2.move(body1.current);
      body3.move(body2.current);
      body4.move(body3.current);
      body5.move(body4.current);
      body6.move(body5.current);
      body7.move(body6.current);
      body8.move(body7.current);
      tail.move(body8.current);
    }
  }

  // console.log(`${head.current.label}, ${body1.current.label} ${body2.current.label}, ${body3.current.label}, ${body4.current.label}, ${body5.current.label}, ${body6.current.label}, ${body7.current.label}, ${body8.current.label}, ${tail.current.label}`);
  console.log(tail.current.label);
  return tail.history.size;
}

// const inputs = [
//   'R 4',
//   'U 4',
//   'L 3',
//   'D 1',
//   'R 4',
//   'D 1',
//   'L 5',
//   'R 2',
// ];
