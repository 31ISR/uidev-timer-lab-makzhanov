// Текст внутри кругов
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Сами круги (SVG)
const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");

// Кнопки
const startBtn = document.getElementById("startBtn");
console.log(startBtn);

const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

// Список кругов
const lapsContainer = document.getElementById("lapsContainer");
const lapList = document.getElementById("lapList");

const circumference = 2 * Math.PI * 52;

let elapsedTime = 0;   // сколько секунд прошло
let timer = null;      // ID интервала (null — таймер не запущен)
let isRunning = false; // идёт ли отсчёт
let lapCount = 0;      // сколько кругов записано

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


function updateCircleProgress(circle, value, max) {
    const progress = (value / max) * circumference;
    circle.style.strokeDasharray = `${progress} ${circumference}`;
}

// updateCircleProgress(hoursCircle, hours, 24);

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;


    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent= seconds.toString().padStart(2, '0');


    updateCircleProgress(hoursCircle, hours, 24);
    updateCircleProgress(minutesCircle, minutes, 60);
    updateCircleProgress(secondsCircle, seconds, 60);
    // TODO 1: записать в hoursEl, minutesEl, secondsEl значения
    //         с ведущими нулями (используйте padStart)

    // TODO 2: вызвать updateCircleProgress для каждого из трёх кругов
    //         (max для часов — 24, для минут и секунд — 60)
}

function start() {
    if (isRunning) return; // защита от двойного запуска

    isRunning = true;

    timer = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;

    // TODO 1: поставить isRunning = true

    // TODO 2: запустить setInterval, который каждую секунду
    //         увеличивает elapsedTime на 1 и вызывает updateDisplay()
    //         Результат сохраните в переменную timer

    // TODO 3: сделать startBtn неактивной, а stopBtn и lapBtn — активными
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    timer = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true
    // TODO 1: остановить интервал через clearInterval(timer)
    // TODO 2: isRunning = false, timer = null
    // TODO 3: startBtn — активна, stopBtn и lapBtn — неактивны
}
function recordLap() {
    if (isRunning) {
        lapCount++;
        const currentTime = formatTime(elapsedTime);

        const lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${currentTime}</span>
        `;

        lapList.insertBefore(lapItem, lapList.firstChild);
        lapsContainer.style.display = "block";
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    lapCount = 0;

    updateDisplay();

    lapList.innerHTML = ""
    lapsContainer.style.display = "none"
    // TODO 1: остановить таймер (можно вызвать stop())
    // TODO 2: elapsedTime = 0, lapCount = 0
    // TODO 3: вызвать updateDisplay(), чтобы вернуть 00 и пустые круги
    // TODO 4: очистить lapList (lapList.innerHTML = "")
    // TODO 5: спрятать lapsContainer (style.display = "none")
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);

