class ElfCPU {
  X: number;
  clockCycle: number;
  isCurrentlyAdding: boolean;
  instructionPointer: number;
  instructionSet: string[];

  constructor(instructions: string[]) {
    this.X = 1;
    this.clockCycle = 1;
    this.isCurrentlyAdding = false;
    this.instructionSet = instructions;
    this.instructionPointer = 0;
  }

  get signalStrength(): number {
    return this.X * this.clockCycle;
  }

  tick(): void {
    if (this.instructionPointer < this.instructionSet.length) {
      const current = this.instructionSet[this.instructionPointer];
      if (current.startsWith('noop')) {
        this.instructionPointer++;
      } else if (current.startsWith('addx')) {
        if (this.isCurrentlyAdding) {
          const value = parseInt(this.instructionSet[this.instructionPointer].split(' ')[1]);
          this.X += value;
          this.isCurrentlyAdding = false;
          this.instructionPointer++;
        } else {
          this.isCurrentlyAdding = true;
        }
      }
    }
    this.clockCycle++;
  }
}

export function part1(inputs: string[]): number {
  const cpu = new ElfCPU(inputs);

  let totalSignalStrength = 0;

  while (cpu.clockCycle <= 220) {
    if ([20, 60, 100, 140, 180, 220].includes(cpu.clockCycle)) {
      totalSignalStrength += cpu.signalStrength;
    }
    cpu.tick();
  }

  return totalSignalStrength;
}

class ElfScreen {
  crt: string[][];
  width: number;
  currentPixel: number;
  currentLine: number;

  constructor(width: number, height: number) {
    this.crt = [];
    for (let i = 0; i < height; i++) {
      this.crt[i] = new Array<string>(width).fill('.');
    }

    this.currentLine = 0;
    this.currentPixel = 0;
    this.width = width;
  }

  draw(X: number): void {
    if ([X - 1, X, X + 1].includes(this.currentPixel)) {
      this.crt[this.currentLine][this.currentPixel] = '#';
    }

    this.currentPixel++;
    if (this.currentPixel === this.width) {
      this.currentLine++;
      this.currentPixel = 0;
    }
  }
}

export function part2(inputs: string[]): string[][] {
  const cpu = new ElfCPU(inputs);
  const screen = new ElfScreen(40, 6);

  while (cpu.clockCycle <= 240) {
    screen.draw(cpu.X);
    cpu.tick();
  }

  return screen.crt;
}
