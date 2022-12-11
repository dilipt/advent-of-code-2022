type Instruction = 'addx' | 'noop';

class ElfCPU {
  X: number;
  clockCycle: number;

  currentInstruction: Instruction | null;
  currentValue: number | null;
  isCurrentlyAdding: boolean;
  instructionPointer: number;

  instructionSet: string[];

  constructor(instructions: string[]) {
    this.X = 1;
    this.clockCycle = 1;
    this.isCurrentlyAdding = false;
    this.currentInstruction = null;
    this.currentValue = null;
    this.instructionSet = instructions;
    this.instructionPointer = 0;
  }

  get signalStrength(): number {
    return this.X * this.clockCycle;
  }

  tick(): void {
    if (this.currentInstruction === null && this.instructionPointer < this.instructionSet.length) {
      const nextInstruction = this.instructionSet[this.instructionPointer];
      if (nextInstruction.startsWith('noop')) {
        this.currentInstruction = 'noop';
      } else if (nextInstruction.startsWith('addx')) {
        this.currentInstruction = 'addx';
        this.currentValue = parseInt(nextInstruction.split(' ')[1], 10);
      } else {
        throw new Error(`unknown instruction: ${nextInstruction}`);
      }
    }

    switch (this.currentInstruction) {
      case 'noop': {
        this.currentInstruction = null;
        this.instructionPointer++;
        break;
      }
      case 'addx': {
        if (this.isCurrentlyAdding) {
          if (this.currentValue === null) throw Error('addx: currentValue cannot be null');
          this.X += this.currentValue;
          this.currentInstruction = null;
          this.currentValue = null;
          this.isCurrentlyAdding = false;
          this.instructionPointer++;
        } else {
          this.isCurrentlyAdding = true;
        }
        break;
      }
      default: {
        this.instructionPointer++;
        break;
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
