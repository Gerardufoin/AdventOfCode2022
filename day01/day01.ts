import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().replace(/\n$/s, '');
const calories = input.toString().split('\n\n').map((a) => a.split('\n').reduce((r, v) => r + parseInt(v), 0)).sort((a, b) => a - b);

console.log(calories.at(-1));
console.log((calories.at(-1) ?? 0) + (calories.at(-2) ?? 0) + (calories.at(-3) ?? 0));
