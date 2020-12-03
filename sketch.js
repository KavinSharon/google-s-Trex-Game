//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage;
var restart,restartImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup;
var cloudsGroup,cloudsImage;
var count
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  cloudsImage=loadImage("cloud.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  
  
}

function setup() {
  createCanvas(600, 200);
  
  count=0;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  gameOver = createSprite(trex.x,80,10,10);
  gameOver.addImage("123",gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(trex.x,100,10,10);
  restart.addImage("1234",restartImage);
  restart.scale = 0.5;
  restart.visible = false;

  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -7;
  

  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
}

function draw() {
  background(180);
  
  //display score
  fill("red");
  text("Score: "+ count, trex.x+200, 30);
  
  if(gameState===PLAY){
  //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
  
//scoring
  count = count + Math.round(getFrameRate()/60);

  trex.velocityX = 7;
  
  if(keyDown("space")&&trex.y>150) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (trex.x > ground.x){
    ground.x = trex.x;
    
  }
  invisibleGround.x = trex.x+100;
   console.log(invisibleGround.x,trex.x); 
 //End the game when trex is touching the obstacle
   if(obstaclesGroup.isTouching(trex)){
     gameState = END;
    }
  }
  
  else if(gameState === END) {
    gameOver.x = trex.x;
    restart.x = trex.x;
    gameOver.visible = true;
    restart.visible = true;
    console.log(gameOver.x,trex.x);
    //set velcity of each game object to 0
    trex.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  camera.position.x = trex.x;
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
 
  count = 0;
  
}
  
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x+500,165,10,40);
    //obstacle.velocityX = -7;
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
   switch(rand){
     case 1:obstacle.addImage("obb1",obstacle1);
    break;
   case 2:obstacle.addImage("obb2",obstacle2);
    break;
    case 3:obstacle.addImage("obb3",obstacle3);
    break;
    case 4:obstacle.addImage("obb4",obstacle4);
    break;
    case 5:obstacle.addImage("obb5",obstacle5);
    break;
    case 6:obstacle.addImage("obb6",obstacle6);
    break;
    default:break;
   
   }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(trex.x+500,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("duhjnmkjn",cloudsImage);
    cloud.scale = 0.5;
   // cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
