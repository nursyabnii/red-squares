// --- ELEMEN HTML ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startMenu = document.getElementById('startMenu');
const playButton = document.getElementById('playButton');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const finalScoreDisplay = document.getElementById('finalScoreDisplay');

// --- ELEMEN AUDIO BARU ---
const spawnSound = document.getElementById('spawnSound');
const gameOverSound = document.getElementById('gameOverSound');


// --- GAME STATES ---
let gameState = 'MENU';
let score = 0;
let highScore = 0;
let animationFrameId;
let spawnInterval;

// --- OBJEK GAME (WARNA NEON) ---
const player = {
    x: 0,
    y: 0,
    radius: 15,
    color: '#00ffff', // Neon Cyan
    shadowColor: '#00ffff'
};
let enemies = [];

class Enemy {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = '#ff00ff'; // Neon Magenta
        this.shadowColor = '#ff00ff';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0 || this.x + this.size >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y + this.size >= canvas.height) this.speedY *= -1;
    }
    draw() {
        // Efek glow
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = 15;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        // Reset shadow agar tidak mempengaruhi elemen lain
        ctx.shadowBlur = 0;
    }
}

// --- FUNGSI UTAMA ---

function saveHighScore() {
    localStorage.setItem('neonDodgeHighScore', highScore);
}

function loadHighScore() {
    const savedHighScore = localStorage.getItem('neonDodgeHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
    }
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function resetGame() {
    score = 0;
    enemies = [];
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    clearInterval(spawnInterval);
}

function startGame() {
    resetGame();
    gameState = 'PLAYING';
    startMenu.style.display = 'none';
    finalScoreDisplay.textContent = '';
    spawnInterval = setInterval(spawnEnemy, 800);
    gameLoop();
}

function endGame() {
    // --- PERBAIKAN DIMULAI DI SINI ---
    // Hentikan interval spawn musuh SEGERA setelah game berakhir.
    // Inilah yang mencegah suara spawn terus muncul.
    clearInterval(spawnInterval);
    // --- PERBAIKAN SELESAI ---

    // Putar suara game over
    gameOverSound.play();

    gameState = 'GAME_OVER';
    const finalScore = Math.floor(score / 10);

    if (finalScore > highScore) {
        highScore = finalScore;
        saveHighScore();
    }

    finalScoreDisplay.textContent = `Your Score: ${finalScore}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    playButton.textContent = 'PLAY AGAIN';
    startMenu.style.display = 'block';
}

function gameLoop() {
    if (gameState !== 'PLAYING') return;

    // Latar belakang dengan efek jejak (fade)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawPlayer();

    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
        if (checkCollision(enemy)) {
            endGame();
        }
    });

    score++;
    drawScore();

    animationFrameId = requestAnimationFrame(gameLoop);
}

// --- FUNGSI GAMBAR & LOGIKA LAINNYA ---

function spawnEnemy() {
    const size = Math.random() * 30 + 10;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;

    const dist = Math.hypot(x - player.x, y - player.y);
    if (dist < player.radius + size + 50) {
        return;
    }

    enemies.push(new Enemy(x, y, size, speedX, speedY));

    // Putar suara saat musuh muncul
    spawnSound.currentTime = 0; // Reset audio ke awal
    spawnSound.play();
}

function drawPlayer() {
    // Efek glow untuk pemain
    ctx.shadowColor = player.shadowColor;
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Reset shadow agar tidak mempengaruhi elemen lain
    ctx.shadowBlur = 0;
}

function checkCollision(enemy) {
    const distX = Math.abs(player.x - enemy.x - enemy.size / 2);
    const distY = Math.abs(player.y - enemy.y - enemy.size / 2);
    if (distX > (enemy.size / 2 + player.radius)) return false;
    if (distY > (enemy.size / 2 + player.radius)) return false;
    if (distX <= (enemy.size / 2)) return true;
    if (distY <= (enemy.size / 2)) return true;
    const dx = distX - enemy.size / 2;
    const dy = distY - enemy.size / 2;
    return (dx * dx + dy * dy <= (player.radius * player.radius));
}

function drawScore() {
    ctx.fillStyle = '#fff'; // Warna skor putih agar kontras
    ctx.font = "24px 'Turret Road', sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + Math.floor(score / 10), 10, 30);
}

// --- EVENT LISTENERS ---
function movePlayerWithMouse(event) {
    if (gameState !== 'PLAYING') return;
    player.x = event.clientX;
    player.y = event.clientY;
}

function movePlayerWithTouch(event) {
    if (gameState !== 'PLAYING') return;
    event.preventDefault();
    const touch = event.touches[0];
    player.x = touch.clientX;
    player.y = touch.clientY;
}

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousemove', movePlayerWithMouse);
canvas.addEventListener('touchmove', movePlayerWithTouch, { passive: false });
playButton.addEventListener('click', startGame);

// --- INISIALISASI GAME ---
function init() {
    resizeCanvas();
    loadHighScore();
    // Gambar latar belakang awal
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

init();