const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = [
    '#ADFF2F',
	'#7FFF00',
	'#7CFC00',
	'#00FF00',
	'#32CD32',
	'#98FB98',
	'#90EE90',
	'#00FA9A',
	'#00FF7F',
	'#3CB371',
	'#2E8B57',
	'#228B22',
	'#008000',
	'#006400',
	'#9ACD32',
	'#6B8E23',
	'#808000',
	'#556B2F',
	'#66CDAA',
	'#8FBC8F',
	'#20B2AA',
	'#008B8B',
	'#008080'	
]

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    console.log('start game!')
    setInterval(decreaseTine, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTine() {
    console.log('decrease time')
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML =
        `<h1 style="color: #ff0000;">
        ВАШЕ<br>
        КОЛИЧЕСТВО<br>
        ФАНТАСТИЧЕСКИХ<br>
        УБИЙСТВ:<br>
        <span class="primary">${score}</span></h1>`}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

    setColor(circle)
  
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 20px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

