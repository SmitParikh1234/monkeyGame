var SERVE = 1;
var PLAY = 0;
var END = 2;
var gameState = SERVE;
var monkey , monkey_running,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var groundImage;
var invisibleGround;
var ground;
var survivalTime = 0;
var score = 0;

function preload(){
  

  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground-5.jpg");
  
  
}



function setup() {
  createCanvas(600,600);
  
// Creating ground
ground = createSprite(0,0,600,600);
ground.addImage(groundImage);

//Creating sprite for monkey
monkey = createSprite(200,300);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.3;
  
//Creating invisibleGround
invisibleGround = createSprite(390,590,800,200);
invisibleGround.visible = false;
  

  
FoodGroup = createGroup();
obstacleGroup = createGroup();
}


function draw() {
  
if(keyDown("space")&& monkey.y >= 200 ) 
{
  monkey.velocityY = -10;
}

// Let's give gravity to monkey
monkey.velocityY = monkey.velocityY+0.8;

  
ground.velocityX = -3;
  
if(ground.x<0) {
  ground.x = ground.width/2;
}
  
  
if(monkey.isTouching(FoodGroup)) {
  FoodGroup.destroyEach();
  score = score+5;
  survivalTime = survivalTime+2;
}
  
if(monkey.isTouching(obstacleGroup)) {
  obstacleGroup.destroyEach();
  gameState = END;
}
  

  
monkey.collide(invisibleGround);
  
 
  drawSprites();
  
  
  //Calling fruits and obstacles function
  fruits();
  obstacles();
  
  if(gameState===SERVE) {
    stroke(0);
    fill("black");
    textSize(47);
    text("PRESS 'SPACE' TO START",10,200);
    ground.velocityX = 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  
  if(keyDown("space") && gameState===SERVE) {
    FoodGroup = createGroup();
    obstacleGroup =  createGroup();
    ground.velocityX = -3;
    gameState = PLAY;
  }
  
  
  
  if(gameState===END) {
  stroke(0);
  fill("black");
  textSize(67);
  text("GAMEOVER",100,200);
  stroke(0);
  fill("black");
  textSize(47);
  text("PRESS 'R' TO PLAY AGAIN",10,300);
  survivalTime = 0;                       
  score = 0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  ground.velocityX = 0;
  FoodGroup.setVisibleEach = false;
}
  
if(keyDown("R") && gameState===END) {
  gameState = SERVE;
}

  
  
  //this is to help display the survival time text on the canvas. 
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SURVIVAL TIME :"+  survivalTime,200,50);
  
  function fruits() {
    if(World.frameCount%80===0) {
      fruit = createSprite(400,(random(120,200)));
      fruit.addImage(bananaImage);
      fruit.scale = 0.2;
      fruit.velocityX = -5;
      fruit.lifetime = 150;
      
      fruit.y = Math.round(random(120,200));
      FoodGroup.add(fruit);
    }
  }
  
  function obstacles() {
    if(World.frameCount%300===0) {
      obstacle = createSprite(400,450);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -5;
      obstacle.lifetime = 150;
      
      obstacleGroup.add(obstacle);
    }
  }
}






