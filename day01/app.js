function handleKeydown(e) {
    const $target = document.querySelector(`div[data-key='${e.keyCode}'`);
    const $audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    if (!$target) return;
    $target.classList.add('pressed');
    $audio.currentTime = 0;
    $audio.play();
}

function handleKeyup(e) {
    const $target = document.querySelector(`div[data-key='${e.keyCode}'`);
    if (!$target) return;
    $target.classList.remove('pressed');
}

function init() {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
}

init();
