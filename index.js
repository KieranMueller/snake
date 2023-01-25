const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
let muteBtn = document.getElementById("mute")


class SnakePart{
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let speed = 8
let tileCount = 20
let tileSize = (canvas.clientWidth/tileCount) - 2
let headX = 10
let headY = 10
const snakeParts = []
let tailLength = 2

let appleX = 5;
let appleY = 5;

let xVelocity = 0
let yVelocity = 0

let score = 0

const gulpSound = new Audio("gulp.mp3") 
const gameOverSound = new Audio("EAS.mp3")

function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if (result) {
        return;
    }
    clearScreen()
    checkAppleCollision()
    drawApple()
    drawSnake()
    drawScore()
    if(score > 30){
        speed = 8 + (score/100)
    }
    setTimeout(drawGame, 1000/speed)
}

function isGameOver() {
    let gameOver = false
    if(yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if(headX < 0 || headX > 19 || headY > 19 || headY < 0) {
        gameOver = true
    }

    for(let i = 0; i<snakeParts.length; i++) {
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        gameOverSound.play()
        ctx.fillStyle = "black"
        ctx.font = "60px Times New Roman"
        ctx.fillText("GAME OVER", 15, 200)
    }

    return gameOver
}

function drawScore() {
    ctx.fillStyle = "white"
    ctx.font = "13px arial"
    if(score<100){
        ctx.fillText("Score: " + score, canvas.clientWidth-60, 20)
    }
    if(score>=100 && score<1000) {
        ctx.fillText("Score: " + score, canvas.clientWidth -70, 20)
    }
    if(score>=1000 && score<10000) {
        ctx.fillText("Score: " + score, canvas.clientWidth -78, 20)
    }
    
}

function clearScreen() {
    ctx.fillStyle = 'rgb(76, 206, 145)'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function drawSnake() {
    
    ctx.fillStyle = "black"
    for(let i =0; i<snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    
    snakeParts.push(new SnakePart(headX, headY))
    if(snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = "rgb(227, 107, 9)"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    ctx.fillStyle = "white"
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength ++
        score += 10
        gulpSound.play()
    }
}

function up() {
    alert()
}

document.body.addEventListener("keydown", keyDown)

function keyDown(event) {
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1
        xVelocity = 0
    }
    if (event.keyCode == 40) {
        if(yVelocity == -1)
            return;
        yVelocity = 1
        xVelocity = 0
    }
    if (event.keyCode == 37) {
        if(xVelocity == 1)
            return;
        yVelocity = 0
        xVelocity = -1
    }
    if (event.keyCode == 39) {
        if(xVelocity == -1)
            return;
        yVelocity = 0
        xVelocity = 1
    }
}

function mutePage() {
    alert("nope")
}

drawGame()


