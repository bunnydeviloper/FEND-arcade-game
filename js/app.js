let score = 0;
let level = 0;
const displayScore = document.createElement('h3');
document.body.append(displayScore);
displayScore.innerHTML = `SCORE: ${score}, LEVEL: ${level}`;
const gameOver = document.getElementById('gameOver');

// ------------------ parent class AllSprites ----------------------
class AllSprites {
  constructor(sprite, x, y, speed) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// ------------------ children of AllSprites ----------------------
class Enemy extends AllSprites {
  constructor(sprite, x, y, speed) {
    super(sprite, x, y, speed);
    this.x -= 100; // make Enemy ease in naturally from the left side
  }
  render() {
    super.render();
  }
  update(timeDelta) {
    this.x += this.speed * timeDelta; // this ensure the game run at same speed for all computer
    checkCollisions();
    // when enemies go off canvas, reset position to appear from left to right
    if (this.x > 505) this.x = -101;
  }
}

// ------------------ children of AllSprites ----------------------
class Player extends AllSprites {
  constructor(sprite, x, y, speed) {
    super(sprite, x, y, speed);
  }
  render() {
    super.render();
  }
  resetPosition() {
    displayScore.innerHTML = `SCORE: ${score}, LEVEL: ${level}`;
    this.x = 200;
    this.y = 380;
  }
  update() {
    // prevent player from going off the right, left, and bottom edge
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 380) this.y = 380;

    // if the score becomes negative, pop up game over and reset the game
    if (score < 0) gameOver.style.display = 'block';

    // player wins when reaches the top edge, alert winning, reset position, and level up
    if (this.y <= -21) {
      score += 100;
      level++;
      levelUp();
      this.resetPosition();
    }
  }
  handleInput(keyPress) {
    if (score >= 0) {
      switch(keyPress) {
        case 'left':
          this.x -= this.speed + 50;
          break;
        case 'right':
          this.x += this.speed + 50;
          break;
        case 'up':
          this.y -= this.speed + 30; // note: y axis starts from top, and the rock distance is smaller
          break;
        case 'down':
          this.y += this.speed + 30; // note: y axis starts from top, and the rock distance is smaller
          break;
      }
    }
  }
}

// Instantiate your Enemy
const allEnemies = [];
const enemy = new Enemy('images/enemy-bug.png', 0, Math.random() * 200 + 40, Math.random() * 300);
allEnemies.push(enemy);

// Instantiate your Player
const player = new Player('images/char-boy.png', 200, 380, 50);

function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if (player.y + 131 >= enemy.y + 90
      && player.x + 25 <= enemy.x + 88
      && player.y + 73 <= enemy.y + 135
      && player.x + 76 >= enemy.x + 11) {
      score -= 30;
      player.resetPosition();
    }
  });
}

function levelUp() {
  const enemy = new Enemy('images/enemy-bug.png', 0, Math.random() * 200 + 40, Math.random() * 300);
  allEnemies.push(enemy);
}

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    72: 'left', // key h
    38: 'up',
    75: 'up', // key k
    39: 'right',
    76: 'right', // key l
    40: 'down',
    74: 'down',  // key j
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

const reset = document.getElementById('reset');
reset.addEventListener('click', function() {
  score = 0;
  level = 0;
  gameOver.style.display = 'none';
  displayScore.innerHTML = `SCORE: ${score}, LEVEL: ${level}`;
  player.x = 200;
  player.y = 380;
  levelUp();
});
