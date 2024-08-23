"use strict";
const SCREEN_WIDTH = 640; // スクリーンの幅
const SCREEN_HEIGHT = 480; // スクリーンの高さ
const BAR_MARGIN = 64;//バーのマージン
const BAR_SIZE = 32;//バーの長さ
const FPS = 30; // フレームレート
let work = {}; // ワーク用グローバル連想配列

// ゲーム初期化
function initialize() {
    //ボール
    work.ball = {};
    ballnit();
    //プレイヤー
    work.player = {};
    work.player.y = 0;
    work.player.score = 0;
    //エネミー
    work.enemy = {};
    work.enemy.y = SCREEN_HEIGHT / 2;
    work.enemy.score = 0;
}

//ボールの初期化
function ballnit() {
    work.ball.x = SCREEN_WIDTH / 2;
    work.ball.y = SCREEN_HEIGHT / 2;
    work.ball.speed = 2;
    work.ball.sx = -2;
    work.ball.sy = 0;
}

// フィールド更新
function update() {
    //プレイヤー移動
    if (mouse.move) {
        work.player.y = mouse.y;
        mouse.move = false;
    }
    if (keyGet("ArrowUp")) work.player.y -= 8;
    if (keyGet("ArrowDown")) work.player.y += 8;
    if (work.player.y < BAR_SIZE / 2) work.player.y = BAR_SIZE / 2;
    if (work.player.y >= SCREEN_HEIGHT - BAR_SIZE / 2)
        work.player.y = SCREEN_HEIGHT - BAR_SIZE / 2;
    //エネミー移動
    if (work.enemy.y > work.ball.y) work.enemy.y -= 5;
    if (work.enemy.y < work.ball.y) work.enemy.y += 5;

    // ボール移動
    work.ball.x += work.ball.sx;
    work.ball.y += work.ball.sy;
    if (work.ball.y <= 0 || work.ball.y >= SCREEN_HEIGHT - 1) work.ball.sy *= -1;
    if (work.ball.x <= 0) {
        work.player.score++;
        ballInit();
    }
    if (work.ball.x >= SCREEN_WIDTH - 1) {
        work.enemy.score++;
        ballInit();
    }
    // プレイヤーとボールの当たり判定
    if (work.ball.x >= SCREEN_WIDTH - BAR_MARGIN - 4
        && work.ball.x <= SCREEN_WIDTH - BAR_MARGIN + 12
        && work.ball.y >= work.player.y - 16
        && work.ball.y < work.player.y + 16) {
        if (work.ball.speed < 16) work.ball.speed++;
        work.ball.sx = -Math.cos((work.ball.y - work.player.y) / 16)
            * work.ball.speed;
        work.ball.sy = Math.sin((work.ball.y - work.player.y) / 16)
            * work.ball.speed;
    }
    // エネミーとボールの当たり判定
    if (work.ball.x >= BAR_MARGIN - 12
        && work.ball.x <= BAR_MARGIN + 4
        && work.ball.y >= work.enemy.y - 16
        && work.ball.y < work.enemy.y + 16) {
        if (work.ball.speed < 16) work.ball.speed++;
        work.ball.sx = Math.cos((work.ball.y - work.enemy.y) / 16)
            * work.ball.speed;
        work.ball.sy = Math.sin((work.ball.y - work.enemy.y) / 16)
            * work.ball.speed;
    }
    draw();
}


// フィールド描画
function draw() {
    // 画面をクリア
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // ボール
    context.fillRect(work.ball.x - 3, work.ball.y - 3, 7, 7);
    // プレイヤー
    context.fillRect(SCREEN_WIDTH - BAR_MARGIN - 3, work.player.y - BAR_SIZE / 2,
        7, BAR_SIZE);
    // エネミー
    context.fillRect(BAR_MARGIN - 3, work.enemy.y - BAR_SIZE / 2, 7, BAR_SIZE);
    // エネミーのスコア
    context.fillText(work.enemy.score, SCREEN_WIDTH * 0.25, 32);
    // プレイヤーのスコア
    context.fillText(work.player.score, SCREEN_WIDTH * 0.75, 32);
}