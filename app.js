const startBtn = document.querySelector('#start');

const screens = document.querySelectorAll('.screen');

const timeList = document.querySelector('#time-list');

const timeEl = document.querySelector('#time');

let time;
let score = 0;

const colors = [
    'linear-gradient(to right, #00d2ff, #3a7bd5)',
    'linear-gradient(to right, #333333, #dd1818)',
    'linear-gradient(to right, #a8ff78, #78ffd6)',
    'linear-gradient(to right, #7f00ff, #e100ff)',
    'linear-gradient(to right, #fffc00, #ffffff)',
    'linear-gradient(to right, #373b44, #4286f4)',
    'linear-gradient(to right, #83a4d4, #b6fbff)'
];

const board = document.querySelector('#board');

startBtn.addEventListener('click', handleClickToStart);
timeList.addEventListener('click', handleClickToTime);
board.addEventListener('click', handleClickToCircle);

function handleClickToCircle(event) {
    if (!event.target.classList.contains('circle')) {
        return;
    }

    score++;
    event.target.remove();
    createRandomCircle();
}

function handleClickToStart(event) {
    event.preventDefault();
    screens[0].classList.add('up');
}

function handleClickToTime(event) {

    if (!event.target.classList.contains('time-btn')) {
        return;
    }

    time = +event.target.getAttribute('data-time');
    screens[1].classList.add('up');
    startGame(time);
}

function startGame() {
    setInterval(dercreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function dercreaseTime() {
    if (time === 0) {
        finishGame();
        return;
    }

    let current = --time;

    if (current < 10) {
        current = `0${current}`;
    }

    setTime(current);
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');

    circle.classList.add('circle');

    const diameter = getRandomNumber(10, 50);

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;

    const {height, width} = board.getBoundingClientRect();

    const x = getRandomNumber(0, width - diameter);
    const y = getRandomNumber(0, height - diameter);

    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;

    const color = getRandomColor();
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}