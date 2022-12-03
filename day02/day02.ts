import fs from 'fs';

function getScoreP1(n: number[]): number {
    return n[1] + (n[0] === n[1] ? 3 : (n[0] % 3 + 1) === n[1] ? 6 : 0);
}

function getScoreP2(n: number[]): number {
    return ((n[1] - 1) * 3) + (n[0] + n[1]) % 3 + 1;
}

const input = fs.readFileSync('./input.txt').toString().replace(/A|X/g, '1').replace(/B|Y/g, '2').replace(/C|Z/g, '3');
const rounds = input.split('\n').filter((v) => v.length > 0).map((v) => v.split(' ').map((n) => parseInt(n)));
console.log(rounds.reduce((r, v) => r + getScoreP1(v), 0));
console.log(rounds.reduce((r, v) => r + getScoreP2(v), 0));