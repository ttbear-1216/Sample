"use strict";
const SCREEN_WIDTH = 640; // スクリーンの幅
const SCREEN_HEIGHT = 480; // スクリーンの高さ
const FPS = 60; // フレームレート
let imgBg000 = new Image(); // 一番奥の背景
let imgBg001 = new Image(); // すこし奥の背景
let imgBg002 = new Image(); // すこし手前の背景
let imgBg003 = new Image(); // 一番手前の背景
let imgChara000 = new Image(); // キャラクター等
let imgDbgFont = new Image(); // フォント画像
let work = {};
function initialize() {
    // 各種画像読み込み
    imgBg000.src = "bg000.png";
    imgBg001.src = "bg001.png";
    imgBg002.src = "bg002.png";
    imgBg003.src = "bg003.png";
    imgChara000.src = "chara000.png";
    imgDbgFont.src = "dbgfont.png";
    // パラメーター初期化
    work.frame = 0;
    work.player = {}; // プレイヤー
    work.player.x = SCREEN_WIDTH / 2;
    work.player.y = SCREEN_HEIGHT / 2;
    work.player.sx = 0;
    work.player.sy = 0;
    work.player.mode = 0;
    work.spark = []; // 障害物
    work.pod = []; // 得点アイテム
    work.gameover = false;
    work.score = 0;
    work.top = 0;
    work.standby = true;
    work.clean = false;
    work.level = 0;
}
// フィールド更新
function update() {
    if (work.clean == true) {
        if (work.frame % SCREEN_WIDTH == 0) {
            work.clean = false;
            work.gameover = false;
            work.standby = true;
            work.frame = 0;
            work.player.x = SCREEN_WIDTH / 2;
            work.player.y = SCREEN_HEIGHT / 2;
            work.player.sx = 0;
            work.player.sy = 0;
            work.player.mode = 0;
            work.spark = [];
            work.pod = [];
            work.score = 0;
        } else {
            work.player.x = work.frame % SCREEN_WIDTH - SCREEN_WIDTH / 2;
            work.player.y = SCREEN_HEIGHT / 2;
            work.player.mode = 0;
        }
    } else if (work.standby == false) {
        // プレイヤー移動
        if (work.gameover == false) {
            if (keyGet('ArrowLeft')) work.player.sx -= 0.1;
            if (keyGet('ArrowRight')) work.player.sx += 0.1;
            work.player.sy += 0.05; // 重力加速
            if (keyGet('Space')) {
                work.player.sy -= 0.15;
                work.player.mode = 2;
            } else {
                if (work.player.sy <= 0) {
                    work.player.mode = 1;
                } else {
                    work.player.mode = 3;
                }
            }
            work.player.x += work.player.sx;
            work.player.y += work.player.sy;
        } else {
            work.player.x++;
            if (work.frame % 2 && work.player.mode < 12) work.player.mode++;
            if (work.frame % SCREEN_WIDTH == 0) {
                work.clean = true;
            }
        }
        // 画面端判定
        if (work.player.x < 16) {
            work.player.x = 16;
            work.player.sx = 0;
        }
        if (work.player.x > SCREEN_WIDTH - 17) {
            work.player.x = SCREEN_WIDTH - 17;
            work.player.sx = 0;
        }
        if (work.player.y < 16) {
            work.player.y = 16;
            work.player.sy *= -0.5;
        }
        if (work.player.y >= SCREEN_HEIGHT) {
            work.player.y = SCREEN_HEIGHT - 1;
            work.player.sy = 0;
        }
        // 障害物
        if (work.clean == false) {
            if (work.level >= 8) {
                if (work.frame % 16 == 0) {
                    work.spark.push({
                        frame: work.frame,
                        y: SCREEN_HEIGHT - 8, sx: 0, sy: 0
                    });
                }
            }
            if (work.frame % (128 - work.level % 8 * 16) == 0) {
                if (work.level >= 24) {
                    work.spark.push({
                        frame: work.frame,
                        y: Math.random() * SCREEN_HEIGHT,
                        sx: Math.random() * 1.5 - 1,
                        sy: Math.random() * 2 - 1
                    });

                } else if (work.level >= 16) {
                    work.spark.push({
                        frame: work.frame,
                        y: Math.random() * SCREEN_HEIGHT,
                        sx: 0, sy: Math.random() * 2 - 1
                    });

                } else {
                    work.spark.push({
                        frame: work.frame,
                        y: Math.random() * SCREEN_HEIGHT,

                        sx: 0, sy: 0
                    });

                }
            }
        }
        if (work.spark.length && work.frame - work.spark[0].frame > SCREEN_WIDTH) {
            work.spark.shift();
        }
        for (let i = 0; i < work.spark.length; i++) {
            work.spark[i].frame += work.spark[i].sx;
            work.spark[i].y += work.spark[i].sy;
            if (work.spark[i].y < 0 || work.spark[i].y >= SCREEN_HEIGHT) {
                work.spark[i].sy *= -1;
            }
        }
        // ポッド出現
        if (work.clean == false) {
            if (work.frame % 128 == 0) {
                work.pod.push({
                    frame: work.frame,
                    y: Math.random() * SCREEN_HEIGHT
                });
            }
        }
        if (work.pod.length && work.frame - work.pod[0].frame > SCREEN_WIDTH) {
            work.pod.shift();
        }
    } else {
        if (keyGet('Space')) {
            work.player.sy -= 0.15;
            work.player.mode = 2;
            work.player.y += work.player.sy;
            work.standby = false;
        }
    }
    // 当たり判定
    // 障害物
    let result;
    if (work.gameover == false) {
        for (let i = 0; i < work.spark.length; i++) {
            result = hitRect(work.player.x - 16, work.player.y - 16,
                work.player.x + 16, work.player.y + 16,
                work.frame - work.spark[i].frame - 8,
                work.spark[i].y - 8,
                work.frame - work.spark[i].frame + 8,
                work.spark[i].y + 8);

            if (result) {
                work.gameover = true;
                break;
            }
        }
        for (let i = 0; i < work.pod.length; i++) {
            result = hitRect(work.player.x - 16, work.player.y - 16,
                work.player.x + 16, work.player.y + 16,
                work.frame - work.pod[i].frame - 16,
                work.pod[i].y - 16,
                work.frame - work.pod[i].frame + 16,
                work.pod[i].y + 16);

            if (result) {
                work.score += 100;
                work.pod[i].frame = work.frame - SCREEN_WIDTH * 2;
            }
        }
    }
    if (work.gameover == false && work.standby == false) {
        work.score++;
        if (work.top < work.score) work.top = work.score;
    }
    draw(); // canvas を更新
    if (false) {
        for (let i = 0; i < work.spark.length; i++) {
            hitRect(work.player.x - 16, work.player.y - 16,
                work.player.x + 16, work.player.y + 16,
                work.frame - work.spark[i].frame - 8,
                work.spark[i].y - 8,
                work.frame - work.spark[i].frame + 8,
                work.spark[i].y + 8);

        }
    }
    if (work.standby == false) {
        work.frame++;
        work.level = Math.floor(work.frame / SCREEN_WIDTH);
    }
}
// 描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    context.drawImage(imgBg000, 0, 0, 640, 480, work.frame * 0.2 % 640, 0, 640, 480);
    context.drawImage(imgBg000, 0, 0, 640, 480, work.frame * 0.2 % 640 - 640, 0, 640, 480);
    context.drawImage(imgBg001, 0, 0, 640, 480, work.frame * 0.4 % 640, 0, 640, 480);
    context.drawImage(imgBg001, 0, 0, 640, 480, work.frame * 0.4 % 640 - 640, 0, 640, 480);
    context.drawImage(imgBg002, 0, 0, 640, 480, work.frame * 0.6 % 640, 0, 640, 480);
    context.drawImage(imgBg002, 0, 0, 640, 480, work.frame * 0.6 % 640 - 640, 0, 640, 480);
    context.drawImage(imgBg003, 0, 0, 640, 480, work.frame * 0.8 % 640, 0, 640, 480);
    context.drawImage(imgBg003, 0, 0, 640, 480, work.frame * 0.8 % 640 - 640, 0, 640, 480);
    // ポッド
    for (let i = 0; i < work.pod.length; i++) {
        context.drawImage(imgChara000,
            Math.floor(work.frame / 4) % 6 * 32, 224, 32, 32,
            work.frame - work.pod[i].frame - 16, work.pod[i].y - 16, 32, 32);
    }
    // 障害物
    for (let i = 0; i < work.spark.length; i++) {
        context.drawImage(imgChara000,
            64 + Math.floor(work.frame / 4) % 4 * 16, 192, 16, 16,
            work.frame - work.spark[i].frame - 8, work.spark[i].y - 8, 16, 16);
    }
    if (work.standby == true || work.clean == true) { // お立ち台
        context.drawImage(imgChara000,
            0, 192, 32, 32, work.player.x - 16, work.player.y + 16, 32, 32);
    }
    if (work.standby == true) {
        fntPrint(SCREEN_WIDTH / 2 - 36, SCREEN_HEIGHT / 2 - 64, "KAME TRIP");
        fntPrint(SCREEN_WIDTH / 2 - 96, SCREEN_HEIGHT / 2 + 64, "PUSH SPACE KEY TO START");
    }
    if (work.player.mode < 12) { // プレイヤー
        context.drawImage(imgChara000,
            64 * (work.player.mode % 4), 64 * (Math.floor(work.player.mode / 4)),
            64, 64, work.player.x - 32, work.player.y - 32, 64, 64);
    }
    if (work.gameover == true) {
        fntPrint(SCREEN_WIDTH / 2 - 68, SCREEN_HEIGHT / 2 - 4, "G A M E O V E R");
    }
    fntPrint(64, 8, "SCORE:" + ("00000000" + work.score).substr(-8));
    fntPrint(SCREEN_WIDTH / 2 - 48, 8, "TOP:" + ("00000000" + work.top).substr(-8));
    fntPrint(SCREEN_WIDTH * 3 / 4, 8, "LEVEL:" + work.level);
}
// フォント文字列表示
function fntPrint(x, y, s) {
    let a;
    for (let i = 0; i < s.length; i++) {
        a = s.charCodeAt(i);
        context.drawImage(imgDbgFont,
            a % 16 * 8, Math.floor(a / 16) * 8, 8, 8,
            x + 8 * i, y, 8, 8);
    }
}
// 矩形同士の当たり判定
function hitRect(x0, y0, x1, y1, x2, y2, x3, y3) {
    context.beginPath();
    context.rect(x0, y0, x1 - x0, y1 - y0);
    context.rect(x2, y2, x3 - x2, y3 - y2);
    context.stroke();
    if (x0 < x3 && x1 > x2
        && y0 < y3 && y1 > y2) {
        return true;
    }
    return false;
}