const API_KEY = 'EKWg2uEqAUFsiVOusabgrdD6zIThv6-f5MGhvtU8xnk';
const URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=30`;

const $imageCount = document.querySelector('.image-count');
const $imageList = document.querySelector('.image-list');
const $loader = document.querySelector('.loader');

let prevImages = null;
let curImages = null;

function makeThrottle(func, wait) {
    let isExecuted = false;

    return function () {
        if (!isExecuted) {
            func();
            isExecuted = true;
        }
        setTimeout(() => {
            isExecuted = false;
        }, wait);
    };
}

function toggleLoader() {
    $loader.classList.toggle('hidden');
}

function fetchData() {
    toggleLoader();
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            curImages = prevImages ? [...prevImages, ...data] : data;
            prevImages = curImages;
            render(curImages);
        });
}

function render(images) {
    toggleLoader();
    $imageList.innerHTML = '';
    $imageCount.textContent = images.length;
    images.forEach((image) => {
        const $link = document.createElement('a');
        $link.className = 'link';
        $link.href = image.links.html;
        $link.target = '_blank';

        const $div = document.createElement('div');
        $div.style.background = `url(${image.urls.regular}) no-repeat 0 0 / cover`;
        $div.className = 'image';

        const $location = document.createElement('span');
        $location.className = 'location';
        $location.textContent = `${image.location.title || ''}`;

        const $like = document.createElement('span');
        $like.textContent = `❤ ${image.likes}`;
        $like.className = 'like';

        $div.append($location, $like);
        $link.append($div);
        $imageList.append($link);
    });
}

function handleScroll(e) {
    const _throttle = makeThrottle(fetchData, 700);
    if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight
    ) {
        _throttle();
    }
}

function init() {
    fetchData();
    window.addEventListener('scroll', handleScroll);
}

init();
