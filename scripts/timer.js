// Sound from: https://www.zapsplat.com/music/desk-or-service-bell-ring-multiple-times-bell-resonate-slightly-broken/

let intervalId;

const htmlTime = document.getElementById("time");
const timerButton = document.getElementById("start-timer");
const totalMinutes = getTotalMinutes();
showStartTime();

timerButton.addEventListener("click", startTimer);

function showStartTime() {
  showTimeInHTML(totalMinutes, 0);
}

function showTimeInHTML(minutes, seconds) {
  const formattedMinutes = formatTimeNumber(minutes);
  const formattedSeconds = formatTimeNumber(seconds);

  htmlTime.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function formatTimeNumber(num) {
  return num.toString().padStart(2, 0);
}

function startTimer() {
  clearInterval(intervalId);

  const totalSeconds = totalMinutes * 60;
  let remainingSeconds = totalSeconds;

  intervalId = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds <= 0) {
      var audio = new Audio("bell.mp3");
      audio.play();
      clearInterval(intervalId);
    }

    const { minutes, seconds } =
      getMinutesAndSecondsFromSeconds(remainingSeconds);
    showTimeInHTML(minutes, seconds);
  }, 1000);
}

function getTotalMinutes() {
  const totalMinutes = localStorage.getItem("totalMinutes");
  if (totalMinutes === null) {
    throw Error("Please specify the total amount of minutes");
  } else {
    return Number(totalMinutes);
  }
}

function getMinutesAndSecondsFromSeconds(timeSeconds) {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  return {
    minutes,
    seconds,
  };
}
