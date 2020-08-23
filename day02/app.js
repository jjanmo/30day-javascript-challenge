const $buttonContainer = document.querySelector('.buttons');
const $analogButton = document.querySelector('.analog-button');
const $digitalButton = document.querySelector('.digital-button');
const $clossButtons = document.querySelectorAll('.close-button');
const $digitalClockContainer = document.querySelector('.digital-clock-container');
const $analogClockContainer = document.querySelector('.analog-clock-container');
const $digitalClock = document.querySelector('.digital-clock');
const $analogHour = document.querySelector('.analog-hour');
const $analogMinute = document.querySelector('.analog-minute');
const $analogSecond = document.querySelector('.analog-second');

let digitalInterval;
let analogInterval;

function getTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return {
        hour,
        minute,
        second,
    };
}

function paintAnalogClock() {
    const $analogHour = document.querySelector('.analog-hour');
    const $analogMinute = document.querySelector('.analog-minute');
    const $analogSecond = document.querySelector('.analog-second');
    const timeObj = getTime();

    $analogHour.style.transform = `rotate(${timeObj.hour * 30}deg)`;
    $analogMinute.style.transform = `rotate(${timeObj.minute * 6}deg)`;
    $analogSecond.style.transform = `rotate(${timeObj.second * 6}deg)`;
}

function paintDigitalClock() {
    const $hour = $digitalClock.querySelector('.digital-hour');
    const $minute = $digitalClock.querySelector('.digital-minute');
    const $second = $digitalClock.querySelector('.digital-second');
    const timeObj = getTime();

    $hour.textContent = timeObj.hour < 10 ? `0${timeObj.hour}` : timeObj.hour;
    $minute.textContent = timeObj.minute < 10 ? `0${timeObj.minute}` : timeObj.minute;
    $second.textContent = timeObj.second < 10 ? `0${timeObj.second}` : timeObj.second;
}

function handleClickButton(e) {
    const {
        target: { textContent },
    } = e;

    if (textContent === 'digital') {
        $digitalClockContainer.classList.remove('hidden');
        $buttonContainer.classList.add('hidden');
        analogInterval && clearInterval(analogInterval);
        paintDigitalClock();
        digitalInterval = setInterval(() => {
            paintDigitalClock();
        }, 1000);
    } else {
        $analogClockContainer.classList.remove('hidden');
        $buttonContainer.classList.add('hidden');
        digitalInterval && clearInterval(digitalInterval);
        paintAnalogClock();
        analogInterval = setInterval(() => {
            paintAnalogClock();
        }, 1000);
    }
}

function handleCloseButton(e) {
    const {
        target: { parentElement },
    } = e;

    parentElement.classList.add('hidden');
    $buttonContainer.classList.remove('hidden');
}

function init() {
    $analogButton.addEventListener('click', handleClickButton);
    $digitalButton.addEventListener('click', handleClickButton);
    $clossButtons.forEach((closeButton) =>
        closeButton.addEventListener('click', handleCloseButton)
    );
}

init();
