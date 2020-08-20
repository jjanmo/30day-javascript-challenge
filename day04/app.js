const $fromInput = document.querySelector('input[name="input"]');
const $fromSelectbox = document.getElementById('from-currency');
const $toInput = document.querySelector('input[name="result"]');
const $toSelectbox = document.getElementById('to-currency');
const $updateDate = document.querySelector('.update-date');

function fetchData() {
    const from = $fromSelectbox.value;
    const target = $fromInput.value;
    const to = $toSelectbox.value;

    if (!from || !to || !target) return;
    fetch(`https://api.exchangeratesapi.io/latest?base=${from}`)
        .then((response) => response.json())
        .then((json) => {
            const { rates, date } = json;

            $toInput.value = (target * rates[to]).toFixed(5);
            $updateDate.textContent = date;
        });
}

function handleInput(e) {
    fetchData();
}

function handleSelectbox(e) {
    fetchData();
}

function init() {
    fetchData();
    $fromInput.addEventListener('input', handleInput);
    $fromSelectbox.addEventListener('change', handleSelectbox);
    $toSelectbox.addEventListener('change', handleSelectbox);
}

init();
