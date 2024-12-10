const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размеры 

canvas.width = 480;
canvas.height = 320;

// Параметры игры
let score = 0;
let lives = 3;

// Параметры мяча
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Параметры платформы
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Управление платформой
let rightPressed = false;
let leftPressed = false;

// Параметры блоков
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Обработка нажатий клавиш
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Проверка столкновений с блоками
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                if (
                    x > brick.x &&
                    x < brick.x + brickWidth &&
                    y > brick.y &&
                    y < brick.y + brickHeight
                ) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("Поздравляем! Вы выиграли!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Отрисовка мяча
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Отрисовка платформы
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Отрисовка блоков
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Отрисовка счета
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Отрисовка количества жизней
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Основной игровой цикл
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // Логика движения мяча
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("Игра окончена");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Логика движения платформы
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();










// Основные части кода:
// const canvas = document.getElementById("gameCanvas");

// Получает доступ к элементу <canvas> из HTML по его id ("gameCanvas") и сохраняет его в переменной canvas.
// const ctx = canvas.getContext("2d");

// Создает 2D-контекст для рисования на холсте. Именно этот объект используется для всех графических операций, таких как рисование фигур, текста, изображений и т.д.
// Размеры холста:

// javascript
// Copy code
// canvas.width = 480;
// canvas.height = 320;
// Устанавливает ширину и высоту холста в пикселях. Эти размеры задают область, где будет происходить игра.
// Параметры игры:

// javascript
// Copy code
// let score = 0;
// let lives = 3;
// Переменные для отслеживания очков (score) и оставшихся жизней (lives).
// Параметры мяча:

// javascript
// Copy code
// let ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 2;
// let dy = -2;
// ballRadius — радиус мяча.
// x и y — начальные координаты мяча на холсте.
// dx и dy — изменения позиции мяча по горизонтали и вертикали (скорость и направление).
// Параметры платформы:

// javascript
// Copy code
// const paddleHeight = 10;
// const paddleWidth = 75;
// let paddleX = (canvas.width - paddleWidth) / 2;
// Высота и ширина платформы.
// paddleX — начальная позиция платформы по горизонтали.
// Управление платформой:

// javascript
// Copy code
// let rightPressed = false;
// let leftPressed = false;
// Флаги для отслеживания нажатия клавиш (стрелок) для управления платформой.
// Параметры блоков (кирпичей):

// javascript
// Copy code
// const brickRowCount = 3;
// const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// Устанавливают количество строк и столбцов кирпичей, их размеры, отступы между ними, а также отступ от верхнего и левого края.
// Массив bricks:

// javascript
// Copy code
// let bricks = [];
// for (let c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for (let r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
// }
// Создает массив для хранения информации о каждом кирпиче.
// Каждый кирпич имеет координаты (x, y) и статус (status), где 1 означает, что кирпич виден, а 0 — разрушен.
// Обработка нажатий клавиш:

// javascript
// Copy code
// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);
// Назначает обработчики событий для нажатий (keydown) и отпусканий (keyup) клавиш.
// Функции для обработки клавиш:

// javascript
// Copy code
// function keyDownHandler(e) {
//     if (e.key === "Right" || e.key === "ArrowRight") {
//         rightPressed = true;
//     } else if (e.key === "Left" || e.key === "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if (e.key === "Right" || e.key === "ArrowRight") {
//         rightPressed = false;
//     } else if (e.key === "Left" || e.key === "ArrowLeft") {
//         leftPressed = false;
//     }
// }
// Устанавливают значения флагов rightPressed и leftPressed в зависимости от нажатия или отпускания клавиш.
// Проверка столкновений с блоками:

// javascript
// Copy code
// function collisionDetection() {
//     for (let c = 0; c < brickColumnCount; c++) {
//         for (let r = 0; r < brickRowCount; r++) {
//             const brick = bricks[c][r];
//             if (brick.status === 1) {
//                 if (
//                     x > brick.x &&
//                     x < brick.x + brickWidth &&
//                     y > brick.y &&
//                     y < brick.y + brickHeight
//                 ) {
//                     dy = -dy;
//                     brick.status = 0;
//                     score++;
//                     if (score === brickRowCount * brickColumnCount) {
//                         alert("Поздравляем! Вы выиграли!");
//                         document.location.reload();
//                     }
//                 }
//             }
//         }
//     }
// }
// Проверяет, пересекается ли мяч с каким-либо кирпичом.
// Если мяч сталкивается с кирпичом, он меняет направление, а кирпич исчезает (status = 0).
// Рисование элементов:

// javascript
// Copy code
// function drawBall() { ... }
// function drawPaddle() { ... }
// function drawBricks() { ... }
// function drawScore() { ... }
// function drawLives() { ... }
// Эти функции отвечают за отрисовку мяча, платформы, кирпичей, счета и жизней.
// Основной игровой цикл:

// javascript
// Copy code
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     drawScore();
//     drawLives();
//     collisionDetection();

//     if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if (y + dy < ballRadius) {
//         dy = -dy;
//     } else if (y + dy > canvas.height - ballRadius) {
//         if (x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         } else {
//             lives--;
//             if (!lives) {
//                 alert("Игра окончена");
//                 document.location.reload();
//             } else {
//                 x = canvas.width / 2;
//                 y = canvas.height - 30;
//                 dx = 2;
//                 dy = -2;
//                 paddleX = (canvas.width - paddleWidth) / 2;
//             }
//         }
//     }

//     if (rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     } else if (leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }

//     x += dx;
//     y += dy;
//     requestAnimationFrame(draw);
// }
// draw();
// Это основной цикл игры, который:
// Очищает холст.
// Перерисовывает все элементы.
// Проверяет столкновения.
// Обновляет позиции мяча и платформы.
// Рекурсивно вызывает сам себя с помощью requestAnimationFrame.
// Для чего нужен <canvas> в HTML?
// Элемент <canvas> — это холст, который используется для отрисовки графики на веб-странице с помощью JavaScript. Он предоставляет пространство, где можно рисовать фигуры, изображения, анимации и игры.

// В данном случае:

// <canvas> — это игровое поле, где отрисовываются мяч, платформа и кирпичи.
// Его контекст 2D используется для всех графических операций.