// script.js

let startTime;
let updatedTime;
let difference;
let timerInterval;
let savedTime = 0;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        timerInterval = setInterval(update, 1000 / 60);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    savedTime = 0;
    running = false;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
}

function update() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}
