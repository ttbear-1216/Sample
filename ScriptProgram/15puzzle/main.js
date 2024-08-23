"use strict";
const SCREEN_WIDTH = 512; // スクリーンの幅
const SCREEN_HEIGHT = 512; // スクリーンの高さ
const OFFSET_X = (SCREEN_WIDTH - 400) / 2;
const OFFSET_Y = (SCREEN_HEIGHT - 400) / 2;
const FPS = 30; // フレームレート
let image0 = new Image();
let aaPuzzle = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, -1],
];
let cx = 3; // 抜けピースの x 座標
let cy = 3; // 抜けピースの y 座標
let shuffle = 256; // シャッフル回数
let gameover = false;
// 初期化処理
function initialize() {
    context.textAlign = "center";
    image0.src = "konami_hall.png"; // パズルに使いたい画像のファイル名
}

// ゲームループ
function update() {
    if (shuffle > 0) {
        switch (Math.floor(Math.random() * 4)) {
            case 0: pieceMove(cx - 1, cy); break;
            case 1: pieceMove(cx + 1, cy); break;
            case 2: pieceMove(cx, cy - 1); break;
            case 3: pieceMove(cx, cy + 1); break;
        }
        shuffle--;
    } else {
        if (mouse.left) {
            let x = Math.floor((mouse.x - OFFSET_X) / 100);
            let y = Math.floor((mouse.y - OFFSET_Y) / 100);
            pieceMove(x, y);
            gameover = judge();
        }
    }
    draw();
}

// 描画処理
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let piece = aaPuzzle[y][x]; // ピース番号 (0~15)
            if (piece == -1) continue;
            let piece_x = piece % 4;
            let piece_y = Math.floor(piece / 4);
            context.drawImage(image0,
                image0.width / 4 * piece_x,
                image0.height / 4 * piece_y,
                image0.width / 4, image0.height / 4,
                OFFSET_X + 100 * x,
                OFFSET_Y + 100 * y, 100, 100);
        }
    }
    if (gameover) {
        context.fillText("CONGRATULATIONS!!", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    }
}

// ピース移動
function pieceMove(x, y) {
    if (x < 0 || x >= 4) return;
    if (y < 0 || y >= 4) return;
    if (x > 0 && aaPuzzle[y][x - 1] == -1) {
        aaPuzzle[y][x - 1] = aaPuzzle[y][x];
        aaPuzzle[y][x] = -1;
        cx++;
    }
    if (x < 3 && aaPuzzle[y][x + 1] == -1) {
        aaPuzzle[y][x + 1] = aaPuzzle[y][x];
        aaPuzzle[y][x] = -1;
        cx--;
    }
    if (y > 0 && aaPuzzle[y - 1][x] == -1) {
        aaPuzzle[y - 1][x] = aaPuzzle[y][x];
        aaPuzzle[y][x] = -1;
        cy++;
    }
    if (y < 3 && aaPuzzle[y + 1][x] == -1) {
        aaPuzzle[y + 1][x] = aaPuzzle[y][x];
        aaPuzzle[y][x] = -1;
        cy--;
    }
}

// クリア判定
function judge() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (x == 3 && y == 3) {
                aaPuzzle[y][x] = 15;
                return true;
            }
            if (aaPuzzle[y][x] != 4 * y + x) return false;
        }
    }
}