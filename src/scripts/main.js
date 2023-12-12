const canvas = document.getElementById("game-screen");
const context = canvas.getContext("2d");
const scoreView = document.getElementById("score");

document.addEventListener('keydown', checkKeyPressed);

let score = 0;
let box = 32;
let snakeX;
let snakeY;
let gameSpeed = 100;
scoreView.innerText = "Score: " + score;

let snake = [];

let direction = "right";

snake[0] = {
    x: 16 * box,
    y: 16 * box
}


let newHead = {
    x: 0,
    y: 0
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function setScore(){
    score++;
    scoreView.innerText = "Score: " + score;
}

function foodSeed(){
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    
    /*Verifica se a posição aleatória da comida não estará
      nas mesmas coordenadas de alguma parte da cobrinha.
      Caso as coordenadas se coincidam a função é chamada novamente
      e uma nova coordenada aleatória é gerada e conferida.
    */
    for(let i = 0; i < snake.length; i++) {
        if(snake[i].x == food.x && snake[i].y == food.y){
            foodSeed();
        }
    }
}

function clearScreen(){
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, 32 * box, 32 * box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = "lightgrey";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function checkKeyPressed(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function checkEdges(){
    if(snake[0].x > 32 * box && direction == "right") snake[0].x = box;
    if(snake[0].x < 0 && direction == "left") snake[0].x = (32 * box) - box;
    if(snake[0].y > 32 * box && direction == "down") snake[0].y = box / 2;
    if(snake[0].y < 0 && direction == "up") snake[0].y = (32 * box) - box / 2;
}

function gameOver() {
    clearInterval(jogo);
}

function checkSnakeSelfColision(){
    for(let i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOver();
        }
    }
}

function setSnakeDirection(){
    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    newHead = {
        x: snakeX,
        y: snakeY
    }
}

function gameLoop() {
    clearScreen();
    checkSnakeSelfColision();
    checkEdges();
    setSnakeDirection();
    createSnake();
    drawFood();

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        setScore();
        foodSeed();
    }

    snake.unshift(newHead);
}

let jogo = setInterval(gameLoop, gameSpeed);
console.log(jogo);