const $buttonContainer = document.querySelector('.button-container');
const $movielist = document.querySelector('.movielist');
const $message = document.querySelector('.message');
const $modalOverlay = document.querySelector('.modal-overlay');
const $modal = document.querySelector('.modal');
const $modalExitButton = document.querySelector('.modal-exit-button');

function filterMovie(movies, genreIds) {
    let filteredMovies = movies.slice();
    if (genreIds) {
        genreIds.forEach((id) => {
            filteredMovies = filteredMovies.filter((movie) => movie.genre_ids.includes(id));
        });
    }
    renderMovies(filteredMovies);
}

function checkGenres() {
    const $buttons = document.querySelectorAll('button');
    const genreIds = Array.from($buttons)
        .filter(($button) => $button.classList.contains('clicked'))
        .map(($button) => genres[$button.textContent]);
    return genreIds;
}

function renderMovies(movies) {
    const $movies = movies.map((movie) => makeMovieBox(movie));
    $movielist.innerHTML = '';
    $movielist.append(...$movies);
    setMessage(movies);
}

function setMessage(movies) {
    $message.textContent = `Find ${movies.length} movies 🎥`;
}

function makeMovieBox(movie) {
    const $movie = document.createElement('div');
    $movie.className = 'movie';
    $movie.dataset.id = movie.id;
    if (movie.poster_path) {
        $movie.style.background = `url(https://image.tmdb.org/t/p/w200${movie.poster_path}) no-repeat 0 0 / cover`;
    } else $movie.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

    const $title = document.createElement('span');
    $title.className = 'contents title';
    $title.textContent = movie.title;

    const $rating = document.createElement('span');
    $rating.className = 'contents rating';
    $rating.textContent = `⭐${movie.vote_average}`;

    const $released = document.createElement('span');
    $released.className = 'contents released';
    $released.textContent = movie.release_date.split('-').join('.');
    $movie.append($title, $released, $rating);

    return $movie;
}

function makeModal(movie) {
    const $poster = document.querySelector('.poster');
    if (movie.poster_path) {
        $poster.style.background = `url(https://image.tmdb.org/t/p/w200${movie.poster_path}) no-repeat 0 0 / cover`;
    } else $poster.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

    const $title = document.querySelector('.modal-title');
    $title.textContent = movie.title === movie.original_title ? movie.title : `${movie.title}(${movie.original_title})`;

    const $detail = document.querySelector('.detail');
    $detail.innerHTML = `${movie.release_date.split('-').join('.')}<span class="divider">|</span>⭐ ${
        movie.vote_average
    }<span class="divider">|</span><span title="vote count">${movie.vote_count}</span>`;

    const $overview = document.querySelector('.overview');
    $overview.textContent = movie.overview;

    $modal.style.top = `${document.documentElement.scrollTop}px`;
    document.body.style.overflow = 'hidden';
    $modalOverlay.classList.remove('hidden');
    $modal.classList.remove('hidden');
}

function handleClickButton(e) {
    const { target } = e;
    if (target.tagName === 'BUTTON') {
        if (target.classList.contains('clicked')) {
            target.classList.remove('clicked');
        } else {
            target.classList.add('clicked');
        }
        filterMovie(movies, checkGenres());
    }
}

function handleClickMovie(e) {
    const { target } = e;

    let movieId;
    if (target.classList.contains('movie')) {
        movieId = target.dataset.id;
    } else if (target.classList.contains('contents')) {
        movieId = target.parentElement.dataset.id;
    }

    const clickedMovie = movies.filter((movie) => movie.id === Number(movieId))[0];
    makeModal(clickedMovie);
}

function handleExitModal() {
    $modalOverlay.classList.add('hidden');
    $modal.classList.add('hidden');
    document.body.style.overflow = 'visible';
}

function init() {
    renderMovies(movies);
    $buttonContainer.addEventListener('click', handleClickButton);
    $movielist.addEventListener('click', handleClickMovie);
    $modalOverlay.addEventListener('click', handleExitModal);
    $modalExitButton.addEventListener('click', handleExitModal);
}

init();
