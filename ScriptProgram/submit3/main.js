"use strict";
const SCREEN_WIDTH = 256; // スクリーンの幅
const SCREEN_HEIGHT = 256; // スクリーンの高さ
const CELLS_X = SCREEN_WIDTH; // x 方向のセルの数
const CELLS_Y = SCREEN_HEIGHT; // y 方向のセルの数
const CELL_SIZE = 1; // セルの幅
const FPS = 90; // フレームレート
let field; // フィールド情報


function initialize() {
    context.fillStyle = 'rgb(0, 255, 0)'; // ドットの色
    field = []; // フィールド情報
    for (let y = 0; y < CELLS_Y; y++) {
        field[y] = [];
        for (let x = 0; x < CELLS_X; x++) {
            // ランダムに「生」「死」を格納
            field[y][x] = Math.floor(Math.random() * 2);
            // ↓ この行をコメントアウトするとランダム配置になります。
            field[y][x] = 0;
        }
    }
    make_glider_gun(); // グライダーガン
}
// フィールド更新
function update() {
    // フィールドを一時記憶領域にディープコピー
    let fieldTmp = structuredClone(field);
    // 一時記憶領域を見ながら次世代のフィールドを計算
    /* ↓ ここに処理を記述 */
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            //周囲8セルに何匹生存がいるか
            let life = 0 - fieldTmp[y][x];
            for (let v = -1; v < 2; v++) {
                for (let u = -1; u < 2; u++) {
                    life += fieldTmp[(y + v + CELLS_Y) % CELLS_Y][(x + u + CELLS_X) % CELLS_X];
                }
            }
            //セルが0(死)の場合、周囲に3匹生存がいれば1(生)に変化
            if (fieldTmp[y][x] == 0 && life == 3) {
                field[y][x] = 1;
            }
            //セルが1(生)の場合、周囲に1匹以下なら過疎、4匹以上なら過密により0(死)に変化
            if (fieldTmp[y][x] == 1 && (life <= 1 || life >= 4)) {
                field[y][x] = 0;
            }
        }
    }
    draw(); // canvas を更新
}
// フィールド描画
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // 画面をクリア
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] != 0) {
                context.fillRect(x * CELL_SIZE, y * CELL_SIZE,
                    CELL_SIZE, CELL_SIZE); // 「生」を描画
            }
        }
    }
}

function make_glider() {
    // グライダー
    field[10][11] = field[11][12] = field[12][10] = field[12][11] = field[12][12] = 1;
}
function make_glider_gun() {
    // グライダー銃
    field[12][9] = field[13][9] = field[13][11] = field[14][9] = field[14][10] = 1;
    field[16][11] = field[16][12] = field[16][13] = field[17][11] = field[18][12] = 1;
    field[14][17] = field[14][19] = field[15][17] = field[15][18] = field[16][18] = 1;
    field[18][18] = field[18][19] = field[19][18] = field[19][20] = field[20][18] = 1;
    field[19][24] = field[20][23] = field[20][24] = field[21][23] = field[21][25] = 1;
    field[20][29] = field[20][30] = field[21][29] = field[21][31] = field[22][29] = 1;
    field[12][31] = field[12][33] = field[13][31] = field[13][32] = field[14][32] = 1;
    field[16][32] = field[16][33] = field[17][32] = field[17][34] = field[18][32] = 1;
    field[17][38] = field[18][37] = field[18][38] = field[19][37] = field[19][39] = 1;
    field[28][37] = field[28][38] = field[28][39] = field[29][37] = field[30][38] = 1;
    field[10][43] = field[11][43] = field[11][45] = field[12][43] = field[12][44] = 1;
    field[14][45] = field[14][46] = field[14][47] = field[15][45] = field[16][46] = 1;
    field[23][48] = field[23][49] = field[24][48] = field[24][50] = field[25][48] = 1;
}