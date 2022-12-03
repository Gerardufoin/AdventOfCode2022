import fs from 'fs';

function getScoreP1(r: number[]): number {
    const middle = r.length / 2;
    const comp = [r.slice(0, middle), r.slice(-middle)];
    return comp[0].filter((v) => comp[1].includes(v))[0];
}

function getScoreP2(r: number[][]): number {
    return r[0].filter((v) => r[1].includes(v) && r[2].includes(v))[0];
}

const input = fs.readFileSync('./input.txt').toString().replace(/\n$/s, '');
const rucksacks = input.split('\n').map((v) => v.split('').map((l) => { const n = l.charCodeAt(0) - 96; return (n < 0 ? n + 58 : n); }));

console.log(rucksacks.reduce((r, v) => r + getScoreP1(v), 0));
console.log(rucksacks.reduce((a, val, idx, arr) => a + (idx % 3 === 0 ? getScoreP2(arr.slice(idx, idx + 3)) : 0), 0));
