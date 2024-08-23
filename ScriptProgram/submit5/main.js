"use strict";
const SCREEN_WIDTH = 640; // スクリーンの幅
const SCREEN_HEIGHT = 480; // スクリーンの高さ
const FPS = 30; // フレームレート
let mx = 4, my = -2;
let isGameOver = true;
let goCount = 300;
let fallCount = 0;
const BASE_X = 224;
const BASE_Y = 80;
let score = 0;
let hiScore = 0;
let eraseLine = 0;
let level = 0;
let work = {}; // ワーク用グローバル連想配列
let bg00 = new Image();
let spr00 = new Image();
let bgm00 = new Audio();
let se00 = new Audio();
let se01 = new Audio();
let aaField = [
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

let aaaTetrimino = [
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
        [0, 2, 2, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
    ],
    // Tミノ
    [
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 3, 3, 0],
        [0, 0, 3, 0],
    ],
    // Sミノ
    [
        [0, 0, 0, 0],
        [0, 0, 4, 4],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
    ],
    // Zミノ
    [
        [0, 0, 0, 0],
        [0, 5, 5, 0],
        [0, 0, 5, 5],
        [0, 0, 0, 0],
    ],
    // Jミノ
    [
        [0, 0, 0, 0],
        [6, 0, 0, 0],
        [6, 6, 6, 0],
        [0, 0, 0, 0],
    ],
    // Lミノ
    [
        [0, 0, 0, 0],
        [0, 0, 7, 0],
        [7, 7, 7, 0],
        [0, 0, 0, 0],
    ]
];

let aaMino = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
];

let aaMinoNext = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
];

// ゲーム初期化
function initialize() {
    bg00.src = "bg00.png";
    spr00.src = "tetris.png";
    bgm00.src = "bgm00.mp3";
    se00.src = "se_maoudamashii_retro12.mp3";
    se01.src = "se_maoudamashii_retro25.mp3";
    gameInit();
}

function gameInit() {
    bgm00.play();
    bgm00.loop = true;

    score = 0;
    eraseLine = 0;
    level = 0;

    for (let y = 0; y < aaField.length; y++) {
        for (let x = 0; x < aaField[y].length; x++) {
            if (aaField[y][x] != 9) aaField[y][x] = 0;
        }
    }
    minoNext();
    minoNext();
}

// フィールド更新
function update() {
    if (isGameOver) {
        let fw = aaField[0].length;
        let fh = aaField.length;
        if (goCount < fw * fh
            && aaField[Math.floor(goCount / fw)][goCount % fw] > 0
            && aaField[Math.floor(goCount / fw)][goCount % fw] < 9) {
            aaField[Math.floor(goCount / fw)][goCount % fw] = 8;
        }
        goCount++;
        if (goCount > fw * fh) {
            if (keyGet("Space")) {
                gameInit();
                isGameOver = false;
                goCount = 0;
            }
        }

        draw();
        return;
    }
    if (keyGet("ArrowLeft")) {
        mx--;
        if (hitTest()) mx++;
    }
    if (keyGet("ArrowRight")) {
        mx++;
        if (hitTest()) mx--;
    }
    if (keyGet("ArrowDown") || fallCount >= 60 - level) {
        fallCount = 0;
        my++;
        if (hitTest()) {
            se00.play();
            my--;
            mino2field();
            minoNext();
        }
    }
    if (keyGet("Space")) {
        minoRotateLeft();
        if (hitTest()) {
            minoRotateLeft();
            minoRotateLeft();
            minoRotateLeft();
        } else {
            se01.play();
        }
    }
    aKeyState = [];

    fallCount++;

    draw();
}

function hitTest() {
    for (let y = 0; y < aaMino.length; y++) {
        for (let x = 0; x < aaMino[y].length; x++) {
            if (my + y < 0) continue;
            if (aaMino[y][x] != 0 && aaField[my + y][mx + x]) {
                return true;
            }
        }
    }
    return false;
}

function mino2field() {
    for (let y = 0; y < aaMino.length; y++) {
        for (let x = 0; x < aaMino[y].length; x++) {
            if (aaMino[y][x] == 0) continue;
            if (my + y < 0) continue;
            aaField[my + y][mx + x] = aaMino[y][x];
        }
    }
    lineCheck();
}

function lineCheck() {
    let clearLine = 0;

    let counter = 0;

    for (let y = aaField.length - 2; y > 0; y--) {
        counter = 0;
        for (let x = 1; x < aaField[y].length - 1; x++) {
            if (aaField[y][x] != 0) counter++;
        }
        if (counter == aaField[y].length - 2) {
            for (let yy = y; yy > 0; yy--) {
                for (let xx = 1; xx < aaField[yy].length - 1; xx++) {
                    if (aaField[yy - 1][xx] == 9) {
                        aaField[yy][xx] = 0;
                    } else {
                        aaField[yy][xx] = aaField[yy - 1][xx];
                    }
                }
            }
            y++;
            clearLine++;
        }
    }
    let scoreTable = [100, 400, 900, 2000];
    if (clearLine > 0) {
        eraseLine += clearLine;
        score += scoreTable[clearLine - 1];
        level = Math.floor(eraseLine / 4);
        if (hiScore < score) hiScore = score;
    }
}

function minoNext() {
    let ran = Math.floor(Math.random() * 7);
    for (let y = 0; y < aaMino.length; y++) {
        for (let x = 0; x < aaMino[y].length; x++) {
            aaMino[y][x] = aaMinoNext[y][x];
            aaMinoNext[y][x] = aaaTetrimino[ran][y][x];
        }
    }
    mx = 4;
    my = -1;
    if (hitTest()) {
        mino2field();
        isGameOver = true;
    }
}

function minoRotateLeft() {
    let aaTmp = structuredClone(aaMino);

    for (let y = 0; y < aaMino.length; y++) {
        for (let x = 0; x < aaMino[y].length; x++) {
            aaMino[y][x] = aaTmp[x][3 - y];
        }
    }
}

function draw() {
    // 画面をクリア
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    //背景表示
    context.drawImage(bg00, 0, 0, bg00.width, bg00.height, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.drawImage(spr00, 0, 16, 192, 400, BASE_X, BASE_Y, 192, 400);

    //フィールド描画
    for (let y = 0; y < aaField.length; y++) {
        for (let x = 0; x < aaField[y].length; x++) {
            context.drawImage(spr00, (aaField[y][x] - 1) * 16, 0, 16, 16,
                BASE_X + 16 * x, BASE_Y + 16 * y, 16, 16);
        }
    }
    //落下中のテトリミノ
    for (let y = 0; y < aaMino.length; y++) {
        for (let x = 0; x < aaMino[y].length; x++) {
            context.drawImage(spr00, (aaMino[y][x] - 1) * 16, 0, 16, 16,
                BASE_X + 16 * (mx + x), BASE_Y + 16 * (my + y), 16, 16);
        }
    }

    //NEXTテトリミノ
    for (let y = 0; y < aaMinoNext.length; y++) {
        for (let x = 0; x < aaMinoNext[y].length; x++) {
            context.drawImage(spr00, (aaMinoNext[y][x] - 1) * 16, 0, 16, 16,
                BASE_X + 16 * (4 + x), BASE_Y + 16 * (-4 + y), 16, 16);
        }
    }

    if (isGameOver) {
        context.textAlign = `center`;
        context.fillText("Game Over", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    }

    context.textAlign = `left`;
    context.fillText(`HI-SCORE`, 32, 64);
    context.fillText(`SCORE`, 32, 128);
    context.fillText(`LINE`, 32, 192);
    context.fillText(`LEVEL`, 32, 256);
    context.textAlign = `right`;
    context.fillText(hiScore, 192, 88);
    context.fillText(score, 192, 152);
    context.fillText(eraseLine, 192, 215);
    context.fillText(level, 192, 280);
}