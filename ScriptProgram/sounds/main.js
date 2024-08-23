"use strict";
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 256;
const FPS = 30;
let bgm00 = new Audio();
let se00 = new Audio();
let se01 = new Audio();
function initialize() {
    bgm00.src = "bgm_maoudamashii_cyber01.mp3";
    se00.src = "se_maoudamashii_retro16.mp3";
    se01.src = "se_maoudamashii_retro12.mp3";
}
function update() {
    if (keyGet("Digit1")) bgm00.play();
    if (keyGet("Digit2")) {
        bgm00.pause();
        bgm00.currentTime = 0;
    }
    if (keyGet("Digit3")) se00.play();
    if (keyGet("Digit4")) se01.play();
    draw();
}
function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.fillText("1: BGM00 play.", 16, 64);
    context.fillText("2: BGM00 stop.", 16, 96);
    context.fillText("3: SE00 play.", 16, 128);
    context.fillText("4: SE01 play.", 16, 160);
}