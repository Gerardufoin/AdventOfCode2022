import fs from 'fs';

function getScoreP1(ass: number[]): number {
    return ((ass[0] <= ass[2] && ass[1] >= ass[3]) || (ass[2] <= ass[0] && ass[3] >= ass[1]) ? 1 : 0);
}

function getScoreP2(ass: number[]): number {
    return (
        (ass[0] >= ass[2] && ass[0] <= ass[3]) ||
        (ass[1] >= ass[2] && ass[1] <= ass[3]) ||
        (ass[2] >= ass[0] && ass[2] <= ass[1]) ||
        (ass[3] >= ass[0] && ass[3] <= ass[1]) ? 1 : 0);
}

const input = fs.readFileSync('./input.txt').toString().replace(/-/g, ',').replace(/\n$/s, '');
const ass = input.split('\n').map((v) => v.split(',').map((n) => parseInt(n)));

console.log(ass.reduce((a, v) => a + getScoreP1(v), 0));
console.log(ass.reduce((a, v) => a + getScoreP2(v), 0));
