const WINDOW_WIDTH = window.innerWidth;
const $left = document.querySelector('.left');
const $right = document.querySelector('.right');
const $leftButton = document.querySelector('.left-button');
const $rightButton = document.querySelector('.right-button');
const $leftBar = document.querySelector('.left-bar');
const $rightBar = document.querySelector('.right-bar');
const $thumbs = document.querySelectorAll('.thumb');
const $bar = document.querySelector('.bar');

let stopMoving;

function handleMouseMove(e) {
    if (stopMoving) {
        clearTimeout(stopMoving);
        if (e.screenX < WINDOW_WIDTH / 2) {
            $leftButton.style.opacity = 1;
        } else {
            $rightButton.style.opacity = 1;
        }
    }
    stopMoving = setTimeout(() => {
        if (e.screenX < WINDOW_WIDTH / 2) {
            $leftButton.style.opacity = 0;
        } else {
            $rightButton.style.opacity = 0;
        }
    }, 2000);
}

function handleMouseOver(e) {
    const { currentTarget } = e;
    if (currentTarget.className.includes('left')) {
        $leftButton.style.opacity = 1;
        $rightButton.style.opacity = 0;
    } else if (currentTarget.className.includes('right')) {
        $leftButton.style.opacity = 0;
        $rightButton.style.opacity = 1;
    } else {
        $leftButton.style.opacity = 0;
        $rightButton.style.opacity = 0;
    }
}

function hideImage() {
    let currentIndex = 0;
    const imageArray = Array.from(document.querySelectorAll('.image'));
    imageArray.forEach(($image, index) => {
        if ($image.classList.contains('show')) {
            currentIndex = index;
            $image.classList.remove('show');
        }
    });
    return currentIndex;
}

function removeThumbBorder() {
    const $thumbs = document.querySelectorAll('.thumb');
    $thumbs.forEach(($thumb) => {
        if ($thumb.classList.contains('selected')) {
            $thumb.classList.remove('selected');
        }
    });
}

function handleMoveImage(e) {
    const { target } = e;
    let currentIndex = hideImage();
    removeThumbBorder();
    const imageArray = Array.from(document.querySelectorAll('.image'));
    const thumbArray = Array.from(document.querySelectorAll('.thumb'));

    if (target.className.includes('left')) {
        $leftButton.style.opacity = 1;
        if (currentIndex !== 0) {
            if (currentIndex === 8) {
                $rightBar.click();
                $leftBar.classList.add('hidden');
                $rightBar.classList.remove('hidden');
            }
            imageArray[--currentIndex].classList.add('show');
            thumbArray[currentIndex].classList.add('selected');
        } else {
            imageArray[0].classList.add('show');
            thumbArray[0].classList.add('selected');
        }

        if (thumbArray[currentIndex].className.includes('hidden')) {
            $rightBar.click();
            $leftBar.classList.remove('hidden');
            $rightBar.classList.add('hidden');
        }
    } else if (target.className.includes('right')) {
        $rightButton.style.opacity = 1;
        if (currentIndex !== 15) {
            if (currentIndex === 7) {
                $leftBar.click();
                $rightBar.classList.add('hidden');
                $leftBar.classList.remove('hidden');
            }
            imageArray[++currentIndex].classList.add('show');
            thumbArray[currentIndex].classList.add('selected');
        } else {
            imageArray[15].classList.add('show');
            thumbArray[15].classList.add('selected');
        }
    }
    if (thumbArray[currentIndex].className.includes('hidden')) {
        $leftBar.click();
        $rightBar.classList.remove('hidden');
        $leftBar.classList.add('hidden');
    }
}

function handleClickThumb(e) {
    const { target } = e;
    const currentIndex = target.dataset.index;
    hideImage();
    removeThumbBorder();
    const thumbArray = Array.from(document.querySelectorAll('.thumb'));
    thumbArray[currentIndex - 1].classList.add('selected');
    const imageArray = Array.from(document.querySelectorAll('.image'));
    imageArray[currentIndex - 1].classList.add('show');
}

function handleToggleBar(e) {
    const { currentTarget } = e;
    if (currentTarget.className.includes('right-bar')) {
        $leftBar.classList.remove('hidden');
        $rightBar.classList.add('hidden');
    } else {
        $rightBar.classList.remove('hidden');
        $leftBar.classList.add('hidden');
    }
    changeThumbState();
}

function changeThumbState() {
    const $thumbs = document.querySelectorAll('.thumb');
    $thumbs.forEach(($thumb) => {
        if ($thumb.classList.contains('hidden')) {
            $thumb.classList.remove('hidden');
        } else {
            $thumb.classList.add('hidden');
        }
    });
}

function init() {
    $left.addEventListener('click', handleMoveImage);
    $right.addEventListener('click', handleMoveImage);
    $left.addEventListener('mouseover', handleMouseOver);
    $right.addEventListener('mouseover', handleMouseOver);
    $thumbs.forEach(($thumb) => $thumb.addEventListener('click', handleClickThumb));
    $leftBar.addEventListener('click', handleToggleBar);
    $rightBar.addEventListener('click', handleToggleBar);
    window.addEventListener('mousemove', handleMouseMove);
}

init();
