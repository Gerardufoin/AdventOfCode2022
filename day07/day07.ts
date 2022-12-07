import fs from 'fs';

class Folder {
    private parent?: Folder;
    private childs: { [id: string] : Folder; } = {};
    private files: string[] = [];
    public size: number = 0;

    constructor(parent: Folder | undefined = undefined) {
        this.parent = parent;
    }

    public cd(folder: string): Folder | undefined {
        if (folder === '..') {
            return this.parent;
        }
        this.addFolder(folder);
        return this.childs[folder];
    }

    public addFolder(folder: string) {
        if (!(folder in this.childs)) {
            this.childs[folder] = new Folder(this);
        }
    }

    public addFile(file: string, size: number) {
        if (!this.files.includes(file)) {
            this.files.push(file);
            this.addSize(size);
        }
    }

    private addSize(size: number) {
        this.size += size;
        this.parent?.addSize(size);
    }

    public getFolderUnderSize(size: number): number {
        return Object.values(this.childs).reduce((a, v) => a + v.getFolderUnderSize(size), (this.size < size ? this.size : 0));
    }

    public getFoldersAboveSize(size: number): number[] {
        return (this.size > size ? [this.size] : []).concat(Object.values(this.childs).map((f) => f.getFoldersAboveSize(size)).flat(1))
    }
}

const input = fs.readFileSync('./input.txt').toString().replace(/\n$/s, '').split('\n');
const root = new Folder();
let current: Folder | undefined = root;
for (const line of input) {
    let res: RegExpMatchArray | null = null;
    if ((res = line.match(/^\$ cd (.*)/))) {
        current = current?.cd(res[1]);
    } else if ((res = line.match(/^dir (.*)/))) {
        current?.addFolder(res[1]);
    } else if ((res = line.match(/^(\d+) (.*)/))) {
        current?.addFile(res[2], parseInt(res[1]));
    }
}

console.log(root.getFolderUnderSize(100000));

const requiredSpace = 30000000 - 70000000 + root.size;
console.log(root.getFoldersAboveSize(requiredSpace).sort((a, b) => a - b)[0]);