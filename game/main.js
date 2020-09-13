var FPS = 60;

const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 660;

var FIELD_MAX_WIDTH = 2000;

var LOADED = true;

var canvas;
var context;

var timer;
var keyCode;

var p;
var bg;

function init()
{
  Data.LOAD();

  canvas = document.getElementById('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  context = canvas.getContext('2d');

  bg = new Background();

  p = new Player();
  p.setLocation(100, 0);
  p.resize(50, 50);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  readTextFile("map.csv");

  timer = setInterval(display, 1000 / FPS);
}

function GRASS_MAP()
{
  for (var i = 0; i < 20; i++)
  {
    Block.place(BlockType.DIRT, i * 60, SCREEN_HEIGHT - blockSize, blockSize, blockSize);

    if (i != 5)
      Block.place(BlockType.GRASS, i * 60, SCREEN_HEIGHT - blockSize * 2, blockSize, blockSize);
  }

  Block.place(BlockType.DIRT, blockSize * 15, SCREEN_HEIGHT - 60 * 3, blockSize, blockSize);
  Block.place(BlockType.GRASS, blockSize * 15, SCREEN_HEIGHT - 60 * 4, blockSize, blockSize);
  Block.place(BlockType.GRASS, blockSize * 15, SCREEN_HEIGHT - 60 * 4, blockSize, blockSize);
  Block.place(BlockType.GRASS, blockSize * 14, SCREEN_HEIGHT - 60 * 4, blockSize, blockSize);
}

function display()
{
  Data.UPDATE();
  OutputConsole();

  if (!LOADED) return;

  bg.setImage(BgImg.SKY_MOUNTAIN);
  bg.draw();

  p.draw();
  p.setSpeed(PlayerSpeed.WALK);
  p.move(true);

  GRASS_MAP();
}

function onKeyDown()
{
  keyCode = event.key + ".down";
}

function onKeyUp()
{
  keyCode = event.key + ".up";
}

function getResourceImage(path)
{
  return "../res/img/" + path + "?" + new Date().getTime();
}

function getFilenameFromPath(path)
{
  var str = path.split('/');
  return str[str.length - 1];
}

function getImageFromGitHub(name)
{
  return "https://raw.githubusercontent.com/yda-r02-gm-17/Mario/master/res/img/" + name + "?" + new Date().getTime();
}

function OutputConsole()
{
  Console.addText("Canvas#context | #translation = " + translation);
  Console.addText("Cookie | " + DataName.WELCOME + " = " + Data.welcome);
  Console.addText("Cookie | " + DataName.ALL_COIN + " = " + Data.all_coin);
  Console.addText("Cookie | " + DataName.STAR_COIN + " = " + Data.star_coin);
  Console.addText("Cookie | " + DataName.SHINE_SPRITE + " = " + Data.shine_sprite);
  Console.addText("");
  Console.addText("Key | " + keyCode);
  Console.addText("");
  Console.addText("Player | X = " + p.x.toFixed(2) + " | Y = " + p.y.toFixed(2));
  Console.addText("Player | #speed = " + p.speed);
  Console.addText("Player | #collision_side = " + p.collision_side);
  Console.addText("Player | #collision_top = " + p.collision_top);
  Console.addText("Player | #isGrounded = " + p.isGrounded);
  Console.addText("Player | #jump = " + p.jump);
  Console.addText("Player | #jumping = " + p.jumping);
  Console.addText("Player | #jumpCounter = " + p.jumpCounter);
  Console.addText("Player | #face = " + (p.face == 'r' ? "r:Right" : "l:Left"));
  Console.addText("Player | #img.src = " + getFilenameFromPath(p.img.src));
  Console.print();
}

class Console
{
  constructor()
  {
    this.text = "";
  }

  static addText(text)
  {
    this.text += "- " + text + "</br>";
  }

  static print()
  {
    document.getElementById('console').innerHTML = "Console Log:</br></br>" + this.text;
    this.text = "";
  }
}

function readTextFile(file)
{
  var req = new XMLHttpRequest();
  req.open("GET", file, false);
  req.send();

  req.onload = function()
  {
    alert(req.responseText);
  }
}
