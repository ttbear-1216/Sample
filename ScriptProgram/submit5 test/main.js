"use strict";

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const FPS = 30;
const BASE_X = 224;
const BASE_Y = 80;
const BLOCK_SIZE = 16;

let mx = 4, my = -2;
let mino = generateMino();
let nextMino = generateMino();
let dropSpeed = 30;
let dropCounter = 0;
let score = 0;
let highScore = 0;

let field = [
    [9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9], //1
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //2
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //3
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //4
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //5
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //6
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //7
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //8
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //9
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //10
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //11
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //12
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //13
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //14
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //15
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //16
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //17
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //18
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //19
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //20
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //21
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //22
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], //23
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]  //24
];

let bg00 = new Image();
let spr00 = new Image();

function initialize() {
    bg00.src = "bg00.png";
    spr00.src = "tetris.png";
    document.addEventListener('keydown', keyDown);
}

function update() {
    dropCounter++;
    if (dropCounter >= dropSpeed) {
        my++;
        dropCounter = 0;
        if (collision()) {
            my--;
            fixMino();
            clearLines();
            mx = 4;
            my = -2;
            mino = nextMino;
            nextMino = generateMino();
            if (collision()) {
                gameOver();
            }
        }
    }
    draw();
}

function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.drawImage(bg00, 0, 0, bg00.width, bg00.height, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.drawImage(spr00, 0, 16, 192, 400, BASE_X, BASE_Y, 192, 400);

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] > 0) {
                context.drawImage(spr00, (field[y][x] - 1) * 16, 0, 16, 16,
                    BASE_X + 16 * x, BASE_Y + 16 * y, 16, 16);
            }
        }
    }

    for (let y = 0; y < mino.length; y++) {
        for (let x = 0; x < mino[y].length; x++) {
            if (mino[y][x] > 0) {
                context.drawImage(spr00, (mino[y][x] - 1) * 16, 0, 16, 16,
                    BASE_X + 16 * (mx + x), BASE_Y + 16 * (my + y), 16, 16);
            }
        }
    }

    // NEXTミノ表示
    context.drawImage(spr00, 0, 16, 192, 400, BASE_X + 200, BASE_Y, 192, 400);
    for (let y = 0; y < nextMino.length; y++) {
        for (let x = 0; x < nextMino[y].length; x++) {
            if (nextMino[y][x] > 0) {
                context.drawImage(spr00, (nextMino[y][x] - 1) * 16, 0, 16, 16,
                    BASE_X + 200 + 16 * x, BASE_Y + 16 * y, 16, 16);
            }
        }
    }

    // スコア表示
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 30);
    context.fillText(`High Score: ${highScore}`, 10, 60);
}

function collision() {
    for (let y = 0; y < mino.length; y++) {
        for (let x = 0; x < mino[y].length; x++) {
            if (mino[y][x] && (field[my + y] && field[my + y][mx + x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function fixMino() {
    for (let y = 0; y < mino.length; y++) {
        for (let x = 0; x < mino[y].length; x++) {
            if (mino[y][x]) {
                field[my + y][mx + x] = mino[y][x];
            }
        }
    }
}

function clearLines() {
    for (let y = field.length - 2; y > 0; y--) {
        let lineFull = true;
        for (let x = 1; x < field[y].length - 1; x++) {
            if (field[y][x] === 0) {
                lineFull = false;
                break;
            }
        }
        if (lineFull) {
            field.splice(y, 1);
            field.splice(1, 0, Array(field[0].length).fill(0));
            score += 100;
            dropSpeed = Math.max(10, dropSpeed - 1);
        }
    }
}

function gameOver() {
    if (score > highScore) {
        highScore = score;
    }
    alert('Game Over!');
    initialize();
}

function generateMino() {
    const minos = [
        // Iミノ
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        // oミノ
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        // Tミノ
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
        ],
        // Sミノ
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        // Zミノ
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0],
        ],
        // Jミノ
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        // Lミノ
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
        ]
    ];
    return minos[Math.floor(Math.random() * minos.length)];
}

function keyDown(e) {
    switch (e.key) {
        case 'ArrowLeft':
            mx--;
            if (collision()) mx++;
            break;
        case 'ArrowRight':
            mx++;
            if (collision()) mx--;
            break;
        case 'ArrowDown':
            my++;
            if (collision()) my--;
            break;
        case 'ArrowUp':
            rotateMino();
            break;
    }
}

function rotateMino() {
    let rotated = mino[0].map((_, i) => mino.map(row => row[i])).reverse();
    let oldMino = mino;
    mino = rotated;
    if (collision()) {
        mino = oldMino;
    }
}

initialize();
setInterval(update, 1000 / FPS);
