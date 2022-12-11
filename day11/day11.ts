import fs from 'fs';

class Monkey {
    public activity = 0;
    private items: number[] = [];
    private operation: { operand: string, value: string } = { operand: '', value: '' };
    private test: number = 0;
    private tstRes: { true: number, false: number } = { true: 0, false: 0 };

    constructor(input: string) {
        let regRes: RegExpMatchArray | null = null;
        if ((regRes = input.match(/Starting items: ((?:\d+(?:, )?)+).*Operation: new = old ([*+]) (\d+|old).*Test: divisible by (\d+).* If true.*(\d+).*If false.*(\d+)/s))) {
            this.items = regRes[1].split(', ').map((v) => parseInt(v));
            this.operation = { operand: regRes[2], value: regRes[3] };
            this.test = parseInt(regRes[4]);
            this.tstRes = { true: parseInt(regRes[5]), false: parseInt(regRes[6]) }
        }
    }

    private operate(): number {
        let itm = this.items.shift() ?? 0;
        const val = (this.operation.value === 'old' ? itm : parseInt(this.operation.value));
        switch (this.operation.operand) {
            case '+':
                itm += val;
                break;
            case '*':
                itm *= val;
                break;
        }
        return (Math.floor(itm / 3));
    }

    public keepAway(monkeys: Monkey[]) {
        while (this.items.length > 0) {
            const itm = this.operate();
            monkeys[itm % this.test === 0 ? this.tstRes.true : this.tstRes.false].getItem(itm);
            this.activity++;
        }
    }

    public getItem(item: number) {
        this.items.push(item);
    }
}

const monkeys: Monkey[] = [];
fs.readFileSync('./input.txt').toString().split('Monkey').forEach((m) => {
    if (m.match(/^ \d/)) {
        monkeys.push(new Monkey(m));
    }
});
for (let i = 0; i < 20; ++i) {
    monkeys.forEach((m) => {
        m.keepAway(monkeys);
    });
}

console.log(monkeys.sort((m1, m2) => m2.activity - m1.activity).slice(0, 2).reduce((a, v) => a * v.activity, 1));
