const $left = document.querySelector('.left-image');
const $right = document.querySelector('.right-image');
const $leftBar = document.querySelector('.left-bar');
const $rightBar = document.querySelector('.right-bar');
const $thumbs = document.querySelectorAll('.thumb');
const $bar = document.querySelector('.bar');

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
    const imageArray = Array.from(document.querySelectorAll('.image'));
    if (target.className.includes('left')) {
        currentIndex === 0
            ? imageArray[15].classList.add('show')
            : imageArray[--currentIndex].classList.add('show');
    } else if (target.className.includes('right')) {
        currentIndex === 15
            ? imageArray[0].classList.add('show')
            : imageArray[++currentIndex].classList.add('show');
    }
}

function handleClickThumb(e) {
    const { target } = e;
    const currentIndex = target.dataset.index;
}

function handleToggleBar(e) {
    const { target } = e;
    console.log(target.tagName);
    if (target.className.includes('thumbs')) {
        hideImage();
        removeThumbBorder();
        const thumbArray = Array.from(document.querySelectorAll('.thumb'));
        thumbArray[currentIndex - 1].classList.add('selected');
        const imageArray = Array.from(document.querySelectorAll('.image'));
        imageArray[currentIndex - 1].classList.add('show');
    } else if (target.tagName === 'I') {
        const $thumbs = document.querySelectorAll('.thumb');
        $thumbs.forEach(($thumb) => {
            console.log($thumb);
            if ($thumb.classList.contains('hidden')) {
                $thumb.classList.remove('hidden');
            } else {
                $thumb.classList.add('hidden');
            }
        });

        if (target.className.includes('left')) {
            $rightBar.classList.remove('hidden');
            $leftBar.classList.add('hidden');
        } else if (target.className.includes('right')) {
            $leftBar.classList.remove('hidden');
            $rightBar.classList.add('hidden');
        }
    }
}

function init() {
    $left.addEventListener('click', handleMoveImage);
    $right.addEventListener('click', handleMoveImage);
    $thumbs.forEach(($thumb) => $thumb.addEventListener('click', handleClickThumb));
    $bar.addEventListener('click', handleToggleBar);
    $leftBar.addEventListener('click', handleToggleBar);
    $rightBar.addEventListener('click', handleToggleBar);
}

init();
