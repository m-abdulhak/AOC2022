
const { fileRowsToArray, sum, l } = require('../util');

const calculateDirSize = (dir) => {
    for (d of dir.dirs) {
        calculateDirSize(d);
    }
    dir.size = sum(dir.dirs.map(dir => dir.size)) + dir.filesSize;
    return dir.size;
}

const p1 = (dirsList) => {
    const smallDirs = dirsList.filter((dir) => dir.size <= 100000);
    return sum(smallDirs.map(d => d.size));
}

const p2 = (root, dirsList) => {
    const total = 70000000;
    const needed = 30000000;
    const used = root.size; 
    const opts = [];

    for (d of dirsList) {
        const s = d.size;
        const rem = total - used + s;
        if (rem > needed) {
            opts.push(s);
        }
    }

    return opts.sort((a, b) => a - b)[0];
}

module.exports = (input) => {
    let blocks = input.split('\n$').map((r) => r.trim());
    blocks = blocks.map((b) => b.split('\n'));

    let root = { name: '/', path: '/', dirs: [], files: [], filesSize: 0, size: 0, parent: null};
    let curDir = root; 
    let dirsList = [ root ];
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        let cmd = block[0];
        let lis = block.slice(1);
        
        if (cmd.startsWith('$')) {
            cmd = cmd.slice(1).trim();
        }

        if (cmd === 'cd /') {
            curDir = root;
        } else if (cmd.startsWith('cd')) {
            const target = cmd.split(' ')[1];
            if (target === '..') {
                curDir = curDir.parent;
            } else {
                curDir = curDir.dirs.find((d) => d.name === target);
            }
        }

        if (cmd === 'ls') {
            const dirs = lis.filter((s) => s.startsWith('dir')).map((s) => s.split(' ')[1]);

            for (dirName of dirs) {
                if (!curDir.dirs.find((dir) => dir.name === dirName)) {
                    const newDir = {
                        name: dirName,
                        path: `${curDir.path === '/' ? '' : curDir.path}/${dirName}`,
                        parent: curDir,
                        dirs: [],
                        files: [],
                        filesSize: 0,
                        size: 0
                    };
                    curDir.dirs.push(newDir);
                    dirsList.push(newDir);
                }
            }

            const files = lis.filter((s) => !s.startsWith('dir')).map((s) => s.split(' ')).map(([s, n]) => [parseInt(s), n]);
            curDir.files.push(...files);
            curDir.filesSize = sum(files.map(([s,n]) => s));
        }
    }

    calculateDirSize(root);

    console.log('Sol 1:', p1(dirsList));
    console.log('Sol 2:', p2(root, dirsList));
}

