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

    // when enemies go off canvas, reset position to appear from left to right and increase speed a little
    if (this.x > 505) {
      this.x = -101;
      this.speed += 25;
    }

    // TODO: add collision checking
  }
}

class Player extends AllSprites {
  constructor(sprite, x, y, speed) {
    super(sprite, x, y, speed);
  }
  render() {
    super.render();
  }

  update() {
    // prevent player from going off the right, left, and bottom edge
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 380) this.y = 380;

    // player wins when reaches the top edge, alert winning and then reset position
    if (this.y <= -21) {
      alert('win');
      this.x = 200;
      this.y = 380;
    }

  }

  handleInput(keyPress) {
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

// Instantiate your Enemy
const allEnemies = [];
const enemy = new Enemy('images/enemy-bug.png', 0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

// Place the player object in a variable called player
const player = new Player('images/char-boy.png', 200, 380, 50);

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
