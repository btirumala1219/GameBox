
//var fileName = "../Content/data.txt";
var word = 'BISHOP';
var wordarray = word.split("");


function createSprite(element, x, y, w, h) {
  var result = new Object();
  result.element = element;
  result.x = x;
  result.y = y;
  result.w = w;
  result.h = h;
  return result;
}

function setPosition(sprite) {
  var e = document.getElementById(sprite.element);
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}

function showSprites() {
  setPosition(hero);
  setPosition(laser);
  for (var i = 0; i < enemies.length; i++) {
    setPosition(enemies[i]);
  }
}

function gotWordRight(index){

  console.log("CORRECT");
}

function toggleKey(keyCode) {
  var tempo = String.fromCharCode(keyCode);
  //console.log(tempo);
  for(var i = 0; i< word.length; i++){
    if(wordarray[i] == tempo){
      gotWordRight(i);
    }
  }
}

document.onkeydown = function(evt) {
  toggleKey(evt.keyCode);

};
