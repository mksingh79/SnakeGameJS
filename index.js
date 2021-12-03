const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
const pauseButton = document.getElementById("pause")
let squares = []
let currentSnake = []
let snakeBody = []
let snakeHead = []
let head = 0
let tail = 0
let direction = 1 // for left and right movement
let width = 20 // for up and down movement
let appleIndex = 0
let scoreCount = 0
let interval = 1000
const speedLoss = 150
let timerId = 0
let checkPause = ""
let counter = 1


function createGrid() {
    //create 100 of square elements, add some color, attach them all to the grid and push them into an array for use later
    for ( let i=0; i< width*width; i++){
        const square = document.createElement("div")
        square.classList.add("square")  // add style to each square
        grid.appendChild(square)
        //square.textContent = i      
        squares.push(square)            // put square inside grid)
    }
    
}
createGrid()

function startGame(){
    // remove the snake
    currentSnake.forEach(index => squares[index].classList.remove("snake", "snakeHead"))
    currentSnake.forEach(index => squares[index].classList.remove("snakeDead"))
    // remove the apple
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    direction = 1
    scoreCount = 0
    currentSnake = [3,2,1,0]
    snakeBody = [2,1,0]
    snakeHead = [3]
    // re add the new score
    score.textContent = scoreCount
    interval = 1000
    // create new snake starting with the head
    squares[snakeHead[0]].classList.add("snakeHead")
    snakeBody.forEach(index => squares[index].classList.add("snake"))
    currentSnake = snakeHead.concat(snakeBody)
    // currentSnake.forEach(index => squares[index].classList.add("snake"))
    // generate new apple
    generateApples()
    timerId = setInterval(move, interval)
    
}

function pauseGame(){    
    if (counter === 1){
        pauseGame = "pause"
        counter = 0
    } else {
        pauseGame = "resume"
        counter = 1
    }
}

function move(){
    if (pauseGame != "pause"){
            // if statement to check the boundary conditions and snake moving over itself. In all these case we will stop the game
        if (
            (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
            (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
            squares[currentSnake[0] + direction].classList.contains("snake", "snakeHead") // check if the snake has gone over itself
        ) {
            currentSnake.forEach(index => squares[index].classList.add("snakeDead"))
            return clearInterval(timerId)
            
        } else {
        //remove last and first element of the snake and save it to a variable
        tail = currentSnake.pop()
        head = currentSnake[0]
        // add a new element in the direction of movement
        currentSnake.unshift(currentSnake[0]+ direction)
        
        // remove the styling of this tail & head
        squares[tail].classList.remove("snake")
        squares[head].classList.remove("snakeHead")
        squares[head].classList.remove("snakeHeadSavour")
        //deal with snake head getting the apple
        if(squares[currentSnake[0]] === squares[appleIndex]){  //  or use squares[currentSnake[0]].classList.contains("apple")
            // remove apple
            squares[currentSnake[0]].classList.remove("apple")
            // replace head styling
            squares[currentSnake[0]].classList.add("snakeHeadSavour")
            // add square to snake 
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            // generate new apple 
            generateApples()
            // increment score and display it
            scoreCount += 1
            score.textContent = scoreCount
            // increase speed of snake
            clearInterval(timerId)
            interval = interval - speedLoss
            timerId = setInterval(move, interval)
        }
        // add styling to the new element
        
        squares[currentSnake[0]].classList.add("snakeHead")
        squares[head].classList.add("snake")
        }
    }

}

function generateApples(){
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake", "snakeHead"))
    
    squares[appleIndex].classList.add("apple")
}

// keyCode is deprecated use key instead
document.addEventListener("keydown", function(e){
    switch (e.key){
        case "ArrowDown": 
        console.log("down")
        direction = +width
            break;
        case "Down":  
        console.log("down")
        direction = +width                               // for IE
            break;
        case "ArrowUp": 
        console.log("up")
        direction = -width
            break;
        case "Up":  
        console.log("up")
        direction = -width                                // for IE                    
            break;
        case "ArrowRight": 
        console.log("right")
        direction = 1
            break;
        case "Right": 
        console.log("right")
        direction = 1                             // for IE
            break;
        case "ArrowLeft": 
        console.log("left")
        direction = -1
            break;
        case "Left":
        console.log("left")
        direction = -1                                // for IE
            break;
    }
})

startButton.addEventListener("click", startGame)
pauseButton.addEventListener("click", pauseGame)


