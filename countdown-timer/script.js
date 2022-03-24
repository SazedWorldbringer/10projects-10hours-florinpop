const secondsEl = document.getElementById('seconds')
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')

const newYear = '07:03:00 10 May 2022'

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

function countDown() {
    const newYearsDate = new Date(newYear)
    const currentDate = new Date()

    const totalSeconds = (newYearsDate - currentDate) / 1000

    const seconds = Math.floor(totalSeconds) % 60
    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const minutes = Math.floor(totalSeconds / 60) % 60

    secondsEl.innerHTML = formatTime(seconds)
    daysEl.innerHTML = days
    hoursEl.innerHTML = formatTime(hours)
    minutesEl.innerHTML = formatTime(minutes)
}

countDown()

setInterval(countDown, 1000)

// const date = document.getElementById('date')
// const defaultVal = date.defaultValue
// const currentVal = date.value


// console.log(defaultVal, currentVal)
