import fs from 'fs';

class Tree {
    public size: number;
    public left?: number;
    public right?: number;
    public top?: number;
    public bottom?: number;

    public left2 = 0;
    public right2 = 0;
    public top2 = 0;
    public bottom2 = 0;

    constructor(size: number) {
        this.size = size;
    }

    public isVisible(): boolean {
        return this.left === undefined
            || this.right === undefined
            || this.top === undefined
            || this.bottom === undefined
            || Math.min(this.left, this.right, this.bottom, this.top) < this.size;
    }

    public getScenicView(): number {
        return this.top2 * this.bottom2 * this.left2 * this.right2;
    }
}

const input = fs.readFileSync('./input.txt').toString();
const forest: Tree[] = [];
for (const t of input.replace(/\n/g, '')) {
    forest.push(new Tree(parseInt(t)));
}
const width = input.indexOf('\n');
const height = forest.length / width;
for (let i = 0; i < width; ++i) {
    const curSize: (number | undefined)[] = [undefined, undefined];
    const top: number[] = [];
    const bottom: number[] = [];
    for (let j = 0; j < height; ++j) {
        const idx = [i + j * width, i + (width - 1 - j) * width];
        forest[idx[0]].top = curSize[0];
        forest[idx[1]].bottom = curSize[1];
        while (forest[idx[0]].top2 < top.length && forest[idx[0]].size > top[forest[idx[0]].top2])
            forest[idx[0]].top2++;
        forest[idx[0]].top2 += top[forest[idx[0]].top2] === undefined ? 0 : 1;
        while (forest[idx[1]].bottom2 < bottom.length && forest[idx[1]].size > bottom[forest[idx[1]].bottom2])
            forest[idx[1]].bottom2++;
        forest[idx[1]].bottom2 += bottom[forest[idx[1]].bottom2] === undefined ? 0 : 1;
        curSize[0] = Math.max(curSize[0] ?? 0, forest[idx[0]].size);
        curSize[1] = Math.max(curSize[1] ?? 0, forest[idx[1]].size);
        top.unshift(forest[idx[0]].size);
        bottom.unshift(forest[idx[1]].size);
    }
}
for (let i = 0; i < height; ++i) {
    const curSize: (number | undefined)[] = [undefined, undefined];
    const left: number[] = [];
    const right: number[] = [];
    for (let j = 0; j < width; ++j) {
        const idx = [i * height + j, i * height + width - 1 - j];
        forest[idx[0]].left = curSize[0];
        forest[idx[1]].right = curSize[1];
        while (forest[idx[0]].left2 < left.length && forest[idx[0]].size > left[forest[idx[0]].left2])
            forest[idx[0]].left2++;
        forest[idx[0]].left2 += left[forest[idx[0]].left2] === undefined ? 0 : 1;
        while (forest[idx[1]].right2 < right.length && forest[idx[1]].size > right[forest[idx[1]].right2])
            forest[idx[1]].right2++;
        forest[idx[1]].right2 += right[forest[idx[1]].right2] === undefined ? 0 : 1;
        curSize[0] = Math.max(curSize[0] ?? 0, forest[idx[0]].size);
        curSize[1] = Math.max(curSize[1] ?? 0, forest[idx[1]].size);
        left.unshift(forest[idx[0]].size);
        right.unshift(forest[idx[1]].size);
    }
}
console.log(forest.filter((t) => t.isVisible()).length);
console.log(Math.max(...forest.map((t) => t.getScenicView())));
