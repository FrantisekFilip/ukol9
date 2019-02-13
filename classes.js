'use strict';

const neighbors = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]];

class Block {

    constructor(id, position) {
        this.elementDOM = document.createElement('div');
        this.elementDOM.setAttribute("id", id);
        this.elementDOM.setAttribute("onclick", `gameField.move(${id})`);
        this.elementDOM.className = "grid-item";
        this.elementDOM.innerHTML = id;
        document.getElementById("grid").appendChild(this.elementDOM);
        this.setPosition(position);
    }

    setPosition(position) {
        this.position = position;
        this.elementDOM.className = `grid-item pos${position}`;
    }
}

class GameField {

    constructor() {
        this.blocks = [];
        this.randoms = [];
        this.randoms[0] = Math.floor(Math.random() * 9);
        for (let i = 1; i < 9; i++) {
            this.random = Math.floor(Math.random() * 9);
            while (this.randoms.includes(this.random)) {
                this.random = Math.floor(Math.random() * 9);
            }
            this.randoms.push(this.random);
            this.blocks[i - 1] = new Block(i, this.randoms[i - 1]);
        }
        this.vacantPos = this.randoms[8];
    }

    move(id) {
        let block = this.blocks[id - 1];
        if (neighbors[block.position].includes(this.vacantPos)) {
            let pos = this.vacantPos;
            this.vacantPos = block.position;
            block.setPosition(pos);
        }
        this.check();
    }

    check() {
        let j = 0;
        for (let i = 0; i < 8; i++) {
            if (i == this.blocks[i].position) {
                j++;
            }
        }
        if (j == 8) {
            let h = document.createElement("h1");
            h.innerHTML = "Victory";
            document.body.appendChild(h);
            console.log('victory');
        }
    }
}


