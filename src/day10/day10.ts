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

export function part2(inputs: string[]): string[][] {
  const cpu = new ElfCPU(inputs);
  const crt = [] as string[][];

  let currentPixel = 0;
  let currentLine = 0;
  crt[0] = new Array<string>(40);
  while (cpu.clockCycle <= 240) {
    if ([cpu.X - 1, cpu.X, cpu.X + 1].includes(currentPixel)) {
      crt[currentLine][currentPixel] = '#';
    } else {
      crt[currentLine][currentPixel] = '.';
    }

    if (currentPixel === 39) {
      currentLine++;
      crt[currentLine] = new Array<string>(40);
    }
    currentPixel = (currentPixel + 1) % 40;
    cpu.tick();
  }

  return crt;
}
