const buttonContainer = document.querySelector('.buttons');
const analogButton = document.querySelector('.analog-button');
const digitalButton = document.querySelector('.digital-button');
const digitalClockContainer = document.querySelector('.digital-clock-container');
const analogClockContainer = document.querySelector('.analog-clock-container');

function handleClickButton(e) {
    const {
        target: { textContent },
    } = e;
    if (textContent === 'digital') {
        digitalClockContainer.classList.remove('hidden');
        buttonContainer.classList.add('hidden');
    } else {
        analogClockContainer.classList.remove('hidden');
        buttonContainer.classList.add('hidden');
    }
}

function init() {
    analogButton.addEventListener('click', handleClickButton);
    digitalButton.addEventListener('click', handleClickButton);
}

init();
