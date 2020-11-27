var END = 0, PLAY = 1, RESET = 2;
var monkey , monkey_running ;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImg ;
var invisibleGround;
var score;
var gameState = PLAY;
var gameOver,gameOverImg;
var restart,restartImg;
var healthbarEimg,healthbarHimg,healthbarFimg;
var healthbarE,healthbarH,healthbarF;
var HEALTH = 2;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  groundImg = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  healthbarFimg = loadImage("healthbarF.png");
  healthbarHimg = loadImage("healthbarH.png");
  healthbarEimg = loadImage("healthbarE.png");
  
}



function setup() {
   createCanvas(700,400);

  monkey = createSprite(65,390,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.2;
  
  
  
  
  ground = createSprite(200,200,900,10)
  ground.addImage("background",groundImg);
  ground.depth=monkey.depth-1;
  ground.scale=1;
  
  invisibleGround = createSprite(400,390,900,10);
  invisibleGround.velocityX = -4;
  invisibleGround.visible = false;

  healthbarE = createSprite(50,30,10,10);
  healthbarE.addImage(healthbarEimg);
  healthbarE.depth=ground.depth+1;
  healthbarE.scale=1.5;
  healthbarE.visible = false;
  
  healthbarH = createSprite(50,30,10,10);
  healthbarH.addImage(healthbarHimg);
  healthbarH.depth=healthbarE.depth+1;
  healthbarH.scale=1.5;
  healthbarH.visible = false;

  
  healthbarF = createSprite(50,30,10,10);
  healthbarF.addImage(healthbarFimg);
  healthbarF.depth=healthbarH.depth+1;
  healthbarF.scale=1.5;
  healthbarF.visible = true;


  
   gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,300,40,40);
  restart.addImage(restartImg);
  restart.visible = false;
  
  console.log(invisibleGround.x);

  score=0;
  

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}

function draw() {
  background("white");
  
   monkey.setCollider("circle",0,0,265);
  monkey.debug = false;
  
 console.log(round(monkey.y));

  
         
  
  if(gameState===PLAY){
     monkey.velocityY = monkey.velocityY + 0.47   ;
    gameOver.visible = false;       


    spawnObstacle();
    spawnfood();
    
    var survivalTime = 0;
   invisibleGround.x=invisibleGround.width/2;
      ground.velocityX = -4;

    if(ground.x<450){
     ground.x=ground.width/2;
     }
     
    
  HEALTH = 2;
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -16;
        
    }
  
        
        
    
  
  if(monkey.isTouching(FoodGroup)){
    score = score+ 2;
    FoodGroup.destroyEach();
  }
  
  
 
  
  if(obstacleGroup.isTouching(monkey) && HEALTH===2){
    monkey.scale=0.1;
    monkey.velocityY = -16;
    HEALTH = HEALTH-1;
    healthbarH.visible = true;
    healthbarF.visible = false;
  }
  
  if(obstacleGroup.isTouching(monkey) && HEALTH===1){
    gameState = END;
    healthbarH.visible = false;
    healthbarF.visible = false;
    healthbarE.visible = true;
  }
  }
  
  
  else if(gameState===END){
 obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.visible = false;
    invisibleGround.visible = false;
    gameOver.visible = true;
    ground.velocityX=0;
    restart.visible = true;
    
  }
  
   if(mousePressedOver(restart)){
   reset();
  
     }

  monkey.collide(invisibleGround);

  fill("white");
  text("SCORE:"+frameCount,450,20);
  score.depth=ground.depth+1;
  
  drawSprites();
  
}

function spawnfood() {
  //write code here to spawn the clouds
 if (frameCount % 150 === 0) {
    banana = createSprite(600,310,40,10);
    banana.y = Math.round(random(180,340));
    banana.addImage(bananaImage);
   banana.x=700;
    banana.scale = 0.1;
    banana.velocityX = invisibleGround.velocityX;
    
    banana.lifetime = 200;
    
    banana.setCollider("circle",0,0,155)
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(600,350,40,10);
    obstacle.x = 700;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = invisibleGround.velocityX;
    
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    obstacle.setCollider("circle",0,0,250)
    obstacle.debug = false;
   
    obstacleGroup.add(obstacle);
  }
}


  
function reset(){
  gameState=PLAY;
  restart.visible = false;
  monkey.visible = true;
  HEALTH = 2;
  healthbarF.visible = true;
  monkey.scale = 0.2;
}
