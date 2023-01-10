// board
let blockSize = 25;
let row = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  getSize() {
    return this.items.length;
  }
}
const snakeBody = new Queue();

snakeBody.enqueue([snakeX, snakeY]);
let snakeLength = snakeBody.getSize();

// food
let foodX;
let foodY;

// points and game over
let gameOver = false;

function stopGame() {
  gameOver = true;
  document.getElementById("alert").innerHTML = "Game Over!";
}

function reset() {
    location.reload();
}

// game function
window.onload = function () {
  board = document.getElementById("board");
  board.height = row * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 8);
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.enqueue([foodX, foodY]);
    snakeLength += 1;
    placeFood();
  }

  // make all the snake body attached to each other
  for (let i = snakeLength - 1; i > 0; i--) {
    snakeBody.items[i] = snakeBody.items[i - 1];
  }
  if (snakeLength) {
    snakeBody.items[0] = [snakeX, snakeY];
    document.getElementById("point").innerHTML = snakeLength;
  }

  

  // draw the whole snake
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  
  for (let i = 0; i < snakeLength; i++) {
    context.fillStyle = "lime";
    context.fillRect(
      snakeBody.items[i][0],
      snakeBody.items[i][1],
      blockSize,
      blockSize
    );
  }
  context.fillStyle = "yellow";
  context.fillRect(
    snakeBody.items[0][0],
    snakeBody.items[0][1],
    blockSize,
    blockSize
  );

  // game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > row * blockSize
  ) {
    gameOver = true;
    document.getElementById("alert").innerHTML = "Game Over!";
  }
  for (let i = 1; i < snakeLength; i++) {
    if (snakeX == snakeBody.items[i][0] && snakeY == snakeBody.items[i][1]) {
      gameOver = true;
      document.getElementById("alert").innerHTML = "Game Over!";
    }
  }
}

// moving function
function changeDirection(e) {
  if (!gameOver) {
    document.getElementById("alert").innerHTML = "Get the foods!";
  }
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}
