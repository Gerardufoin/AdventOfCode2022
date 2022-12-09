import fs from 'fs';

function itHadToBeSnakes(input: string[], knobs: number): number {
    const snake: number[][] = [];
    for (let i = 0; i < knobs; ++i) {
        snake.push([0, 0]);
    }
    const tailIdx = knobs - 1;
    const uniquePos: string[] = [snake[tailIdx].toString()];
    for (let mov of input) {
        let regRes: RegExpMatchArray | null = null;
        if ((regRes = mov.match(/([LRUD]) (\d+)/))) {
            let dir = [regRes[1] === 'R' ? 1 : regRes[1] === 'L' ? -1 : 0, regRes[1] === 'U' ? 1 : regRes[1] === 'D' ? -1 : 0];
            for (let i = 0; i < parseInt(regRes[2]); ++i) {
                snake[0][0] += dir[0];
                snake[0][1] += dir[1];
                for (let s = 1; s < knobs; ++s) {
                    if (Math.floor(Math.sqrt(Math.pow(snake[s - 1][0] - snake[s][0], 2) + Math.pow(snake[s - 1][1] - snake[s][1], 2))) > 1) {
                        snake[s][0] += Math.sign(snake[s - 1][0] - snake[s][0]);
                        snake[s][1] += Math.sign(snake[s - 1][1] - snake[s][1]);
                    }
                }
                if (!uniquePos.includes(snake[tailIdx].toString())) {
                    uniquePos.push(snake[tailIdx].toString());
                }
            }
        }
    }
    return uniquePos.length;
}

const input = fs.readFileSync('./input.txt').toString().split('\n');
console.log(itHadToBeSnakes(input, 2));
console.log(itHadToBeSnakes(input, 10));
