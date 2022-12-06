import fs from 'fs';

function findFirstXDiff(input: string[], x: number) {
    const stack: string[] = [];
    let i = 0;
    while (stack.length < x && i < input.length) {
        while (stack.includes(input[i])) {
            stack.shift();
        }
        stack.push(input[i++]);
    }
    return i;  
}

const input = fs.readFileSync('./input.txt').toString().split('');

console.log(findFirstXDiff(input, 4));
console.log(findFirstXDiff(input, 14));
