
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SPACE_KEY = 32;
var HERO_MOVEMENT = 3;

var lastLoopRun = 0;

var controller = new Object();
var enemies = new Array();

function createSprite(element, x, y, w, h) {
  var result = new Object();
  result.element = element;
  result.x = x;
  result.y = y;
  result.w = w;
  result.h = h;
  return result;
}

function toggleKey(keyCode, isPressed) {
  if (keyCode == LEFT_KEY) {
    controller.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controller.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controller.up = isPressed;
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
  }
  if (keyCode == SPACE_KEY) {
    controller.space = isPressed;
  }
}

function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function ensureBounds(sprite, ignoreY) {
  if (sprite.x < 20) {
    sprite.x = 20;
  }
  if (!ignoreY && sprite.y < 20) {
    sprite.y = 20;
  }
  if (sprite.x + sprite.w > 480) {
    sprite.x = 480 - sprite.w;
  }
  if (!ignoreY && sprite.y + sprite.h > 480) {
    sprite.y = 480 - sprite.h;
  }
}

function setPosition(sprite) {
  var e = document.getElementById(sprite.element);
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}

function handleControls() {
  if (controller.up) {
    hero.y -= HERO_MOVEMENT;
  }
  if (controller.down) {
    hero.y += HERO_MOVEMENT;
  }
  if (controller.left) {
    hero.x -= HERO_MOVEMENT;
  }
  if (controller.right) {
    hero.x += HERO_MOVEMENT;
  }
  if (controller.space && laser.y <= -120) {
    laser.x = hero.x + 9;
    laser.y = hero.y - laser.h;
  }

  ensureBounds(hero);
}

function checkCollisions() {
  for (var i = 0; i < enemies.length; i++) {
    if (intersects(laser, enemies[i])) {
      var element = document.getElementById(enemies[i].element);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
      laser.y = -laser.h;
    } else if (intersects(hero, enemies[i])) {
      var element = document.getElementById(hero.element);
      element.style.visibility = 'hidden';
    } else if (enemies[i].y + enemies[i].h >= 500) {
      var element = document.getElementById(enemies[i].element);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
    }
  }
}

function showSprites() {
  setPosition(hero);
  setPosition(laser);
  for (var i = 0; i < enemies.length; i++) {
    setPosition(enemies[i]);
  }
}

function updatePositions() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += 4;
    enemies[i].x += getRandom(7) - 3;
    ensureBounds(enemies[i], true);
  }
  laser.y -= 12;
}

function addEnemy() {
  if (getRandom(50) == 0) {
    var elementName = 'enemy' + getRandom(10000000);
    var enemy = createSprite(elementName, getRandom(450), -40, 35, 35);

    var element = document.createElement('div');
    element.id = enemy.element;
    element.className = 'enemy';
    document.children[0].appendChild(element);

    enemies[enemies.length] = enemy;
  }
}

function getRandom(maxSize) {
  return parseInt(Math.random() * maxSize);
}

function loop() {
  if (new Date().getTime() - lastLoopRun > 40) {
    updatePositions();
    handleControls();
    checkCollisions();

    addEnemy();

    showSprites();

    lastLoopRun = new Date().getTime();
  }
  setTimeout('loop();', 2);
}

document.onkeydown = function(evt) {
  toggleKey(evt.keyCode, true);
};

document.onkeyup = function(evt) {
  toggleKey(evt.keyCode, false);
};

var hero = createSprite('hero', 250, 460, 20, 20);
var laser = createSprite('laser', 0, -120, 2, 50);

loop();
