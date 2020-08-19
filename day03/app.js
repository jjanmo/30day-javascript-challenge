const $body = document.body;
const $main = document.querySelector('main');
const $modeToggle = document.getElementById('mode');
const $divider = document.querySelector('.divider');
const $message = document.querySelector('.message');
const $links = document.querySelectorAll('a');

function getColors() {
    const bodyLightColor = getComputedStyle(document.documentElement).getPropertyValue('--body-light-color');
    const lightModeColor = getComputedStyle(document.documentElement).getPropertyValue('--light-mode-color');
    const lightModeBgColor = getComputedStyle(document.documentElement).getPropertyValue('--light-mode-bg-color');
    const lightModeBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--light-mode-border');
    const lightModeLink = getComputedStyle(document.documentElement).getPropertyValue('--light-link-color');
    const bodyDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--body-dark-color');
    const darkModeColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-color');
    const darkModeBgColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-bg-color');
    const darkModeBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-border');
    const darkModeLink = getComputedStyle(document.documentElement).getPropertyValue('--dark-link--color');

    return {
        bodyLightColor,
        lightModeColor,
        lightModeBgColor,
        lightModeBorderColor,
        lightModeLink,
        bodyDarkColor,
        darkModeColor,
        darkModeBgColor,
        darkModeBorderColor,
        darkModeLink,
    };
}

function handleToggle() {
    const {
        bodyLightColor,
        lightModeColor,
        lightModeBgColor,
        lightModeBorderColor,
        lightModeLink,
        bodyDarkColor,
        darkModeColor,
        darkModeBgColor,
        darkModeBorderColor,
        darkModeLink,
    } = getColors();
    if ($modeToggle.checked) {
        $body.style.backgroundColor = bodyDarkColor;
        $main.style.color = darkModeColor;
        $main.style.backgroundColor = darkModeBgColor;
        $divider.style.borderColor = darkModeBorderColor;
        $message.textContent = 'This is dark mode';
        $links.forEach(($link) => {
            $link.style.color = darkModeLink;
            $link.style.borderColor = darkModeLink;
        });
    } else {
        $body.style.backgroundColor = bodyLightColor;
        $main.style.color = lightModeColor;
        $main.style.backgroundColor = lightModeBgColor;
        $divider.style.borderColor = lightModeBorderColor;
        $message.textContent = 'This is light mode';
        $links.forEach(($link) => {
            $link.style.color = lightModeLink;
            $link.style.borderColor = lightModeLink;
        });
    }
}

function init() {
    $modeToggle.addEventListener('change', handleToggle);
}

init();
