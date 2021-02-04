var backgrdImage, backgrd, ground, groundImage;
var monkey, monkeyImage;
var banana, bananaImage, stone, stoneImage, bananaGroup, stoneGroup;
var score = 0;
var PLAY = 1;
var END =0;
var gameState =PLAY;
var score = 0;

function preload(){
    backgrdImage = loadImage("jungle.jpg");
    monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

    bananaImage = loadImage("banana.png");
    stoneImage = loadImage("stone.png");
}
function setup() {
  createCanvas(800, 400);
  
  backgrd = createSprite(0,0,800,400);
  backgrd.addImage("jungle",backgrdImage);
  backgrd.scale = 1.5;
  backgrd.velocityX=-4;
  
  monkey =createSprite(100,280,50,80);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.1;
  
  ground = createSprite(0,320,800,20);
  ground.visible=false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true;
}

function draw() {
  background(255);
  if(backgrd.x<0){
      backgrd.x=backgrd.width/2;
  }
  
  
  if(keyDown("space")&& monkey.y >= 230){
      monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide(ground);

  spawnBanana();
  
  spawnStone();

  if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
  }
      
    switch(score){
        case 10: monkey.scale=0.15;
                break;
        case 20: monkey.scale=0.20;
                break;
        case 30: monkey.scale=0.25;
                break;
        case 40: monkey.scale=0.30;
                break;
        default: break;
    }
  
  if(stoneGroup.isTouching(monkey)){
    monkey.scale = 0.1;
  }
    
  drawSprites();  
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score: "+ score, 700,50);
}

function spawnBanana(){
  if (frameCount%100 == 0){
    banana = createSprite(800,100,10,10);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(50,300));
    banana.scale = 0.04;
    banana.velocityX = -4;
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}

function spawnStone(){
  if(frameCount%150 == 0){
     stone = createSprite(800,280,50,40);
     stone.addImage("stone",stoneImage);
     stone.scale = 0.2;
     stone.velocityX = -6;
     stone.lifetime = 300;
     stoneGroup.add(stone);
  }
}