const grid = document.querySelector(".grid")
const scorePan = document.querySelector(".score")
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const gridWidth = 580
const gridHeight = 300
const startPosition = [240,270]
const ballStartPosition = [280, 240]
let ballCurrentPosition = ballStartPosition
let currentPosition = startPosition
let score = 0
const array = [-2,2]
let xDirection = array[Math.floor(Math.random() * 2)]
let yDirection = -2
scorePan.innerHTML = score

/// define block object
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

/// draw blocks inside blocks array
function drawBlock() {
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.top = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
    
}

/// all blocks array
const blocks = [
    new Block(20,20),
    new Block(130,20),
    new Block(240,20),
    new Block(350,20),
    new Block(460,20),
    new Block(20,50),
    new Block(130,50),
    new Block(240,50),
    new Block(350,50),
    new Block(460,50),
]

drawBlock()

/// create user
const user = document.createElement("div")
user.classList.add("user")
grid.appendChild(user)
user.style.left = currentPosition[0] + 'px'
user.style.top = currentPosition[1] + 'px'

/// create ball
const ball = document.createElement("div")
ball.classList.add("ball")
grid.appendChild(ball)
ball.style.left = ballCurrentPosition[0] + 'px'
ball.style.top = ballCurrentPosition[1] + 'px'

/// draw ball with current position of ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.top = ballCurrentPosition[1] + 'px'
}

/// draw user with current position of user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.top = currentPosition[1] + 'px' 
}



/// move user
function moveUser(e) {
    switch(e.key){

        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < 480){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

/// move ball 
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkCollision()
    
}

/// change direction
function changeDirection() {
    
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    } 
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}

function gameOver() {
    clearInterval(timer)
    document.removeEventListener('keydown', moveUser)
    scorePan.innerHTML = ":("
}

/// checking collisions
function checkCollision() {

    /// user collision
    if( 
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] < currentPosition[1] && ballCurrentPosition[1] > currentPosition[1] - blockHeight)
        
        ){
        console.log("KULLANICIYA ÇARPTI")
        changeDirection()
    }
    
    /// grid walls collision
    if( ballCurrentPosition[0] >= (gridWidth - ballDiameter) || ballCurrentPosition[1] <= 0 || ballCurrentPosition[0] <= 0){
        changeDirection()
    } else if(ballCurrentPosition[1] >= gridHeight - ballDiameter) {
        gameOver()
    }

    /// blocks collision
    for(let i = 0; i < blocks.length; i++){
        if( (ballCurrentPosition[0] >= blocks[i].bottomLeft[0]) && (ballCurrentPosition[0] <= blocks[i].bottomRight[0]) &&  
            (ballCurrentPosition[1] >= blocks[i].topLeft[1]) && (ballCurrentPosition[1] <= blocks[i].topRight[1])  
        ){
            const allBlocks = Array.from(document.querySelectorAll(".block"))
            allBlocks[i].classList.remove("block")
            blocks.splice(i, 1)
            score++
            scorePan.innerHTML = score
            changeDirection()
        }

        if(blocks.length == 0){
            gameOver()
        }
    }
 
}



timer = setInterval(moveBall,30)
document.addEventListener("keydown", moveUser)