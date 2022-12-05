import fs from 'fs';

const crateMover: number = 9001
const containers: string[][] = [];

const input = fs.readFileSync('./input.txt').toString().replace(/\n$/s, '').split('\n');
for (const line of input) {
    if (line.includes('[')) {
        const slots = line.match(/.{1,4}/g) ?? [];
        for (let i = 0; i < slots.length; ++i) {
            if (slots[i][1] !== ' ') {
                containers[i] = containers[i] ?? [];
                containers[i].push(slots[i][1]);
            }
        }
    }
    if (line.includes('move')) {
        const cmd = line.match(/move (\d+) from (\d+) to (\d+)/);
        if (cmd) {
            switch (crateMover) {
                case 9000:
                    for (let i = parseInt(cmd[1]); i > 0; --i) {
                        containers[parseInt(cmd[3]) - 1].unshift(containers[parseInt(cmd[2]) - 1].shift() ?? 'OHNO');
                    }
                    break;
                case 9001:
                    containers[parseInt(cmd[3]) - 1] = containers[parseInt(cmd[2]) - 1].splice(0, parseInt(cmd[1])).concat(containers[parseInt(cmd[3]) - 1]);
                    break;
            }
        }
    }
}

console.log(containers.map((c) => c[0]).join(''));