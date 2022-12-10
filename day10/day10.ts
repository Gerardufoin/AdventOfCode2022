import fs from 'fs';

function draw(screen: string, pos: number): string {
    const scrPos = screen.length % 40 + 1;
    return scrPos >= pos && scrPos < pos + 3 ? '#' : '.';
}
const input = fs.readFileSync('./input.txt').toString().split('\n');
const registers: number[] = [1];
let screen = '#';
for (const inst of input) {
    let regRes: RegExpMatchArray | null = null;
    if ((regRes = inst.match(/([\w+]+) ?(-?\d+)?/))) {
        switch (regRes[1]) {
            case 'noop':
                    registers.push(registers.at(-1) ?? 0);
                    screen += draw(screen, registers.at(-1) ?? 0);
                break;
            case 'addx':
                registers.push(registers.at(-1) ?? 0);
                screen += draw(screen, registers.at(-1) ?? 0);
                registers.push((registers.at(-1) ?? 0) + parseInt(regRes[2]));
                screen += draw(screen, registers.at(-1) ?? 0);
                break;
        }
    }
}
console.log(registers[19] * 20 + registers[59] * 60 + registers[99] * 100 + registers[139] * 140 + registers[179] * 180 + registers[219] * 220);
console.log(screen.replace(/(.{40})/g, '$1\n').replace(/.$/, ''));