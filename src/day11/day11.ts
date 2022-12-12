import path from 'path';
import fs from 'fs';

type Operation = '+' | '*';

class MonkeyOperation {
  operation: Operation;
  value: 'old' | number;

  constructor(operation: Operation, value: string) {
    this.operation = operation;
    this.value = value === 'old' ? 'old' : parseInt(value, 10);
  }

  result(old: number): number {
    switch (this.operation) {
      case '*': return this.value === 'old' ? old * old : this.value * old;
      case '+': return this.value === 'old' ? old + old : this.value + old;
    }
  }
}

class MonkeyTest {
  divisor: number;
  monkeyTrue: number;
  monkeyFalse: number;

  constructor(divisor: number, monkeyTrue: number, monkeyFalse: number) {
    this.divisor = divisor;
    this.monkeyTrue = monkeyTrue;
    this.monkeyFalse = monkeyFalse;
  }

  result(newValue: number): number {
    return (newValue % this.divisor === 0) ? this.monkeyTrue : this.monkeyFalse;
  }
}

interface TurnResult {
  monkey: number
  item: number
};

class Monkey {
  id: number;
  items: number[];
  operation: MonkeyOperation;
  monkeyTest: MonkeyTest;
  numberOfInspections: number;

  constructor(id: number, startingItems: number[], operation: string[], monkeyTest: MonkeyTest) {
    this.id = id;
    this.items = startingItems;
    this.operation = new MonkeyOperation(operation[0] as Operation, operation[1]);
    this.monkeyTest = monkeyTest;
    this.numberOfInspections = 0;
  }

  takeTurn(): TurnResult[] {
    const results: TurnResult[] = [];
    while (this.items.length > 0) {
      const item = this.items.shift();
      this.numberOfInspections++;
      if (item == null) throw new Error('wtf');
      const newItem = Math.floor(this.operation.result(item) / 3);
      const newMonkey = this.monkeyTest.result(newItem);
      results.push({ item: newItem, monkey: newMonkey });
    }
    return results;
  }
}

function createMonkeys(): Monkey[] {
  const monkeyInput = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n\n');
  const monkeys = [];
  for (const monkeyText of monkeyInput) {
    const data = monkeyText.split('\n');
    const id = parseInt(data[0].split(' ')[1].trim().replace(':', ''), 10);
    const startingItems = data[1].split(': ')[1].split(', ').map(item => parseInt(item, 10));
    const operation = data[2].split('old ')[1].split(' ');
    const divisor = parseInt(data[3].split('divisible by ')[1], 10);
    const monkeyTrue = parseInt(data[4].split('to monkey ')[1], 10);
    const monkeyFalse = parseInt(data[5].split('to monkey ')[1], 10);
    monkeys.push(new Monkey(
      id,
      startingItems,
      operation,
      new MonkeyTest(divisor, monkeyTrue, monkeyFalse),
    ));
  }
  return monkeys;
}

export function day11part1(): void {
  const monkeys = createMonkeys();

  for (let i = 1; i <= 20; i++) {
    for (const monkey of monkeys) {
      const results = monkey.takeTurn();
      for (const result of results) {
        const receiver = monkeys.find(monkey => monkey.id === result.monkey);
        receiver?.items.push(result.item);
      }
    }
  }

  const [first, second] = monkeys.map(monkey => monkey.numberOfInspections).sort((a, b) => (b - a)).slice(0, 2);
  console.log(first * second);
}
