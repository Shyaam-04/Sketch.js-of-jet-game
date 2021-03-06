var jetImg,jetUp,jetDown,JETTopGroup,JETDownGroup;
var border1, border2,border3,border4,bordedrUp,borderDown;
var playerJet, playerJetImg;
var spaceShip, spaceShipImg,spaceBGImage;
var gate1,gate2;
var bullet, bulletUp,bulletDown,bulletAttackerDown,bulletAttackerUp,playerBulletGroup;
var diamond, diamondImg;
var player,enemy,enemyGroup;
var wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16,wall17,wall18,wall19,wall20,wall21,wall22,wall23,wall24,wall25,wall26,wall27,wall28,wall29,wall30,wall31,wall32,wall33,wall34,wall35,wall36,wall37,wall38,wall39,wall40,wall41,wall42,wall43,wall44,wall45;

var gameState = "STAGE1";
var shield = 1000, shieldVisibility=255;;
var score = 0;

function  preload(){
  //loading all the images
  jetImg=loadImage("sprites/attacker jet.png");
  spaceShipImg = loadAnimation("sprites/spaceshuttle.png","sprites/output-onlinepngtools.png","sprites/output-onlinepngtools (1).png","sprites/output-onlinepngtools (2).png","sprites/output-onlinepngtools (3).png","sprites/output-onlinepngtools (4).png","sprites/output-onlinepngtools (5).png","sprites/output-onlinepngtools (6).png","sprites/output-onlinepngtools (7).png","sprites/output-onlinepngtools (8).png","sprites/output-onlinepngtools (9).png","sprites/output-onlinepngtools (10).png");
  playerJetImg = loadImage("sprites/jet7.png");
  diamondImg = loadImage("sprites/diamond.png");
  spaceBGImage = loadImage("sprites/spaceBG.png");
 
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //var edges = createSprite();

  //creating the spaceship
  spaceShip = createSprite(windowWidth/2,windowHeight/2);
  spaceShipImg.frameDelay=8;
  spaceShip.addAnimation("rotate",spaceShipImg);
  spaceShip.scale = 0.4;
  

  //creating the player ship
  playerJet = createSprite(500,310);
  playerJet.addImage(playerJetImg);
  playerJet.scale = 0.1;

  //creating the diamond that the enemies need to steal from the spaceShip
  diamond = createSprite(750,320);
  diamond.addImage(diamondImg);
  diamond.scale = 0.3

  //invisible gates of the spaceShip
  gate1 = createSprite(windowWidth/2,windowHeight/2-70,50,20);
  gate2 = createSprite(windowWidth/2,windowHeight/2+100,50,20);
  gate1.shapeColor = "white";
  gate2.shapeColor = "white";

   //invisible borders of the spaceShip
  border1 = createSprite(windowWidth/2-100,windowHeight/2-100,140,20);
  border2 = createSprite(windowWidth/2-100,windowHeight/2+100,140,20);
  border3 = createSprite(windowWidth/2+100,windowHeight/2-100,140,20);
  border4 = createSprite(windowWidth/2+100,windowHeight/2+100,120,20);
 
  border1.shapeColor = "red";
  border3.shapeColor = "green";
  border2.shapeColor = "blue";  
  border4.shapeColor = "purple";

  //making the borders and gates invisible 
  border1.visible=false;
  border2.visible=false;
  border3.visible=false;
  border4.visible=false;
  gate1.visible=false;
  gate2.visible=false;

  //creating the player inside the maze
  player = createSprite(30,30,40,40);
  player.shapeColor = "white";

 
 
   //creating a group for the groups of enemy jets and bullets
  JETTopGroup=new Group();
  JETDownGroup = new Group();
  bulletAttackerDown = new Group();
  bulletAttackerUp = new Group();
  playerBulletGroup = new Group();
  borderUp=new Group();
  borderDown = new Group();
  enemyGroup = new Group();
 // enemyGroup.add(enemy);
  borderUp.add(border1);borderUp.add(border3);
  borderDown.add(border2);borderUp.add(border4);
}

function draw(){
  console.log(frameCount);
  edges = createEdgeSprites();
  player.bounceOff(edges);
  enemyGroup.bounceOff(edges);

 //the outer part of the spaceShip with the player and the opponents visible
  if(gameState==="STAGE1"){
  background(spaceBGImage);
  fill("red");
  text(mouseX+","+mouseY,mouseX,mouseY);
  fill("white");
  textSize(20);
  text("Enemies Down: "+score,20,20);
  fill("orange");
  textSize(20);
  text("Space Ship Health: "+shield,windowWidth-250,20);
  if(score>=5){
    if(shield<=800){
      sheid = shield+200;
      score = 0;
    }
    else{
      shield=1000;
    }
   
    
  }
 
  //Spawning attacker ships from top and bottom respectively
  attackShipTop();
  attackShipDown();

  //moving the player according to a key
  if(keyIsDown(UP_ARROW)){
    playerJet.y-=5;
  }
  if(keyIsDown(DOWN_ARROW)){
    playerJet.y+=5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    playerJet.x+=5;
  }
  if(keyIsDown(LEFT_ARROW)){
    playerJet.x-=5;
  }

  //used to fore the bullets of the player
  if(keyWentDown("space")){
    bullet = createSprite(playerJet.x,playerJet.y,5,5);
    bullet.shapeColor = "orange";
    bullet.velocityY = -4;
    playerBulletGroup.add(bullet);
    //  bullet.debug = true;
    //bullet.setCollider("circle",0,0,50);
  }
  diamond.visible = false;
  player.visible = false;
 
  //fireBalls.visible = false;

  //reduce defense shield when attacker bullets hit the space station
  if(bulletAttackerDown.isTouching(border1)||bulletAttackerDown.isTouching(border2)
  ||bulletAttackerDown.isTouching(border3)||bulletAttackerDown.isTouching(border4)
  ||bulletAttackerUp.isTouching(border1)||bulletAttackerUp.isTouching(border2)
  ||bulletAttackerUp.isTouching(border3)||bulletAttackerUp.isTouching(border4))
  {
    shield = shield-2;
  }

    //the last phase of stage 1 and stage group2 appears
  //if(JETTopGroup.isTouching(gate1)||JETDownGroup.isTouching(gate2)){
    if(frameCount%50==0){
    JETTopGroup.destroyEach();
    JETDownGroup.destroyEach();
    spaceShip.destroy();
    playerJet.destroy();
    playerBulletGroup.destroyEach();
    bulletAttackerDown.destroyEach();
    bulletAttackerUp.destroyEach();
    
    gameState = "STAGE2";
 }
  
  
  }
  //the view of inside of the spaceShip
  else if(gameState==="STAGE2"){
    //destroy everything
    background("yellow");
   
    //call funtion of maze
    maze();
   // diamond.display();
   diamond.visible = true;
   player.visible = true;
   if(frameCount%50==0){
     //calling enemy funtion
     enemyAI();
   }
   if(player.isTouching(enemyGroup)){
     enemy.destroy();
   }
   if(enemyGroup.isTouching(diamond)){
     background("white");
     textSize(30);
     fill("black");
     text("GAME OVER!",160,160);
     enemyGroup.setVelocityXEach(0);
     enemyGroup.setVelocityYEach(0);
     player.velocityX = 0;
     player.velocityY = 0;
     wall1.shapeColor = "white";
     wall2.shapeColor = "white";
     wall3.shapeColor = "white";
     wall4.shapeColor = "white";
     wall5.shapeColor = "white";
     wall6.shapeColor = "white";
     wall7.shapeColor = "white";
     wall8.shapeColor = "white";
     wall9.shapeColor = "white";
     wall10.shapeColor = "white";
     wall11.shapeColor = "white";
     wall12.shapeColor = "white";
     wall13.shapeColor = "white";
     wall14.shapeColor = "white";
     wall15.shapeColor = "white";
     //wall16.visible = false;
     wall17.shapeColor = "white";
     wall18.shapeColor = "white";
     wall19.shapeColor = "white";
     wall20.shapeColor = "white";
     wall21.shapeColor = "white";
     wall22.shapeColor = "white";
     wall23.shapeColor = "white";
     wall24.shapeColor = "white";
     wall25.shapeColor = "white";
     wall26.shapeColor = "white";
     wall27.shapeColor = "white";
     wall28.shapeColor = "white";
     wall29.shapeColor = "white";
     wall30.shapeColor = "white";
     wall31.shapeColor = "white";
     wall32.shapeColor = "white";
     wall33.shapeColor = "white";
     wall34.shapeColor = "white";
     wall35.shapeColor = "white";
     wall36.shapeColor = "white";
     wall37.shapeColor = "white";
     wall38.shapeColor = "white";
     wall39.shapeColor = "white";
     wall40.shapeColor = "white";
     wall41.shapeColor = "white";
     wall42.shapeColor = "white";
     wall43.shapeColor = "white";
     wall44.shapeColor = "white";
     wall45.shapeColor = "white";
    diamond.visible = false;


     
   }

   //making
    
  }
  drawSprites();
  fill("yellow");
  textSize(15);
  text("Gate1",windowWidth/2,windowHeight/2-70,20);
  text("Gate2",windowWidth/2,windowHeight/2+100,20);

}

function attackShipTop(){ 
  
  if(frameCount%300 == 0){ 

  jetUp = createSprite(random(200,windowHeight-200),0); 
  jetUp.addImage(jetImg); 
  jetUp.velocityY = 2; 
  jetUp.scale = -0.08;
  //jetUp.debug=true;
  JETTopGroup.add(jetUp);
  jetUp.lifetime = 300;
  JETTopGroup.collide(borderUp)
 
  }
   if(frameCount%20===0 && frameCount>300){
    bulletUp = createSprite(jetUp.x,jetUp.y,5,5);
    bulletUp.shapeColor = "purple";
    bulletUp.velocityY = 6;
    bulletAttackerUp.add(bulletUp);
    bulletUp.lifetime = 90;
  } 
  if(frameCount>300 && playerBulletGroup.isTouching(jetUp)){
    jetUp.destroy();
    console.log("attacker destroyed");
    score = score+1;
  }

  }
 

function attackShipDown(){
  
    if((frameCount+50)%300==0){
        jetDown = createSprite(random(200,windowWidth-200),windowHeight);
        jetDown.addImage(jetImg);
        jetDown.velocityY = -2;
        //jetDown.debug=true;
        jetDown.scale = 0.08;
        JETDownGroup.add(jetDown);
        jetDown.lifetime = 300;
        JETDownGroup.collide(borderDown)
    }
    
    if(frameCount%20===0 && frameCount>250){
      bulletDown = createSprite(jetDown.x,jetDown.y,5,5);
      bulletDown.shapeColor = "purple";
      bulletDown.velocityY = -6;
      bulletAttackerDown.add(bulletDown);
      bulletDown.lifetime = 90;
     //o console.log(frameCount);
    } 
    if(frameCount>250 && playerBulletGroup.isTouching(jetDown)){
      jetDown.destroy();
      score = score+1;
    }
}
//enemies inside the spaceShip
function enemyAI(){
    //creating the enemies inside the maze
  //enemy = createSprite(random(10,1200),30,10,10);
  enemy = createSprite(random(10,1200),30,20,20);
  enemy.shapeColor = "black";
  enemy.velocityY = 30;
  enemy.velocityX = 30;
  enemyGroup.add(enemy);
 
}

function maze(){
  text(mouseX+","+mouseY,mouseX,mouseY);
  wall1 = createSprite(105,30,20,470);
  wall2 = createSprite(130,270,70,20);
  wall3 = createSprite(170,310,20,100);
  wall4 = createSprite(170,360,150,20);
  wall5 = createSprite(105,520,20,170);
  wall6 = createSprite(754,274,130,20);
  wall7 = createSprite(754,350,130,20);
  wall8 = createSprite(155,523,120,20);
  wall9 = createSprite(205,595,20,160);
  wall10 = createSprite(1240,30,20,200);
   wall11 = createSprite(1240,287,20,170);
   wall12 = createSprite(1240,550,20,200);
   wall13 = createSprite(1200,90,80,20);
   wall14 = createSprite(1180,300,120,20);
   wall15 = createSprite(1225,580,50,20);
   wall17 = createSprite(1050,30,20,300);
   wall18 = createSprite(1050,190,90,20);
   wall19 = createSprite(650,200,120,20);
   wall20 = createSprite(590,310,20,240);
   wall21 = createSprite(645,440,130,20);
   wall22 = createSprite(840,200,120,20);
   wall23 = createSprite(890,325,20,243);
   wall24 = createSprite(840,440,120,20);
   wall25 = createSprite(220,80,250,20);
   wall26 = createSprite(350,160,20,180);
   wall27 = createSprite(230,170,50,20);
   wall28 = createSprite(350,540,20,250);
   wall29 = createSprite(405,250,130,20);
   wall30 = createSprite(430,550,180,20);
   wall31 = createSprite(590,30,20,200);
   wall32 = createSprite(700,160,20,100);
   wall33 = createSprite(750,100,120,20);
   wall34 = createSprite(890,30,20,140);
   wall35 = createSprite(890,190,20,50);
  wall36 = createSprite(650,500,20,140);
   wall37 = createSprite(835,500,20,140);
   wall38 = createSprite(680,560,80,20);
   wall39 = createSprite(960,400,150,20);
   wall40 = createSprite(1100,650,20,350);
   wall41 = createSprite(875,580,100,20);
   wall42 = createSprite(510,350,150,20);
   wall43 = createSprite(535,60,100,20);
   wall44 = createSprite(240,450,50,20);
   wall45 = createSprite(1000,300,50,20);
  wall1.shapeColor = "green";
  wall2.shapeColor = "green";
  wall3.shapeColor = "green";
  wall4.shapeColor = "green";
  wall5.shapeColor = "green";
  wall6.shapeColor = "blue";
  wall7.shapeColor = "blue";
  wall8.shapeColor = "green";
  wall9.shapeColor = "red";
  wall10.shapeColor = "green";
  wall11.shapeColor = "green";
  wall12.shapeColor = "green";
  wall13.shapeColor = "green";
  wall14.shapeColor = "green";
  wall15.shapeColor = "red";
 // wall16.shapeColor = "green";
  wall17.shapeColor = "green";
  wall18.shapeColor = "green";
  wall19.shapeColor = "green";
  wall20.shapeColor = "red";
  wall20.shapeColor = "green";
  wall21.shapeColor = "green";
  wall22.shapeColor = "green";
  wall23.shapeColor = "red";
  wall24.shapeColor = "green";
  wall25.shapeColor = "green";
  wall26.shapeColor = "red";
  wall27.shapeColor = "green";
  wall28.shapeColor = "green";
  wall29.shapeColor = "green";
  wall30.shapeColor = "red";
  wall31.shapeColor = "green";
  wall32.shapeColor = "green";
  wall33.shapeColor = "red";
  wall34.shapeColor = "green";
  wall35.shapeColor = "green";
  wall36.shapeColor = "red";
  wall37.shapeColor = "green";
  wall38.shapeColor = "green";
  wall39.shapeColor = "green";
  wall40.shapeColor = "red";
  wall41.shapeColor = "green";
  wall42.shapeColor = "green";
  wall43.shapeColor = "red";
  wall44.shapeColor = "red";
  wall45.shapeColor = "red";
  
  player.bounceOff(wall1);
  player.bounceOff(wall2);
  player.bounceOff(wall3);
  player.bounceOff(wall4);
  player.bounceOff(wall5);
  player.bounceOff(wall6);
  player.bounceOff(wall7);
  player.bounceOff(wall8);
  player.bounceOff(wall9);
  player.bounceOff(wall10);
  player.bounceOff(wall11);
  player.bounceOff(wall12);
  player.bounceOff(wall13);
  player.bounceOff(wall14);
  player.bounceOff(wall15);
  //player.bounceOff(wall16);
  player.bounceOff(wall17);
  player.bounceOff(wall18);
  player.bounceOff(wall19);
  player.bounceOff(wall20);
  player.bounceOff(wall21);
  player.bounceOff(wall22);
  player.bounceOff(wall23);
  player.bounceOff(wall24);
  player.bounceOff(wall25);
  player.bounceOff(wall26);
  player.bounceOff(wall27);
  player.bounceOff(wall28);
  player.bounceOff(wall29);
  player.bounceOff(wall30);
  player.bounceOff(wall31);
  player.bounceOff(wall32);
  player.bounceOff(wall33);
  player.bounceOff(wall34);
  player.bounceOff(wall35);
  player.bounceOff(wall36);
  player.bounceOff(wall37);
  player.bounceOff(wall38);
  player.bounceOff(wall39);
  player.bounceOff(wall40);
  player.bounceOff(wall41);
  player.bounceOff(wall42);
  player.bounceOff(wall43);
  player.bounceOff(wall44);
  enemyGroup.bounceOff(wall1);
  enemyGroup.bounceOff(wall2);
  enemyGroup.bounceOff(wall3);
  enemyGroup.bounceOff(wall4);
  enemyGroup.bounceOff(wall5);
  enemyGroup.bounceOff(wall8);
 // enemyGroup.bounceOff(wall9);
  enemyGroup.bounceOff(wall10);
  enemyGroup.bounceOff(wall11);
  enemyGroup.bounceOff(wall12);
  enemyGroup.bounceOff(wall13);
  enemyGroup.bounceOff(wall14);
 // enemyGroup.bounceOff(wall15);
  //enemyGroup.bounceOff(wall16);
  enemyGroup.bounceOff(wall17);
  enemyGroup.bounceOff(wall18);
  enemyGroup.bounceOff(wall19);
  //enemyGroup.bounceOff(wall20);
  enemyGroup.bounceOff(wall21);
  enemyGroup.bounceOff(wall22);
  //enemyGroup.bounceOff(wall23);
  enemyGroup.bounceOff(wall24);
  enemyGroup.bounceOff(wall25);
  //enemyGroup.bounceOff(wall26);
  enemyGroup.bounceOff(wall27);
  enemyGroup.bounceOff(wall28);
  enemyGroup.bounceOff(wall29);
  //enemyGroup.bounceOff(wall30);
  enemyGroup.bounceOff(wall31);
  enemyGroup.bounceOff(wall32);
  //enemyGroup.bounceOff(wall33);
  enemyGroup.bounceOff(wall34);
  enemyGroup.bounceOff(wall35);
  //enemyGroup.bounceOff(wall36);
  enemyGroup.bounceOff(wall37);
  enemyGroup.bounceOff(wall38);
  enemyGroup.bounceOff(wall39);
  //enemyGroup.bounceOff(wall40);
  enemyGroup.bounceOff(wall41);
  enemyGroup.bounceOff(wall42);
   
  
  
  
  




  if(keyIsDown(UP_ARROW)){
    player.y-=15;
  }
  if(keyIsDown(DOWN_ARROW)){
    player.y+=15;
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.x+=15;
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x-=15;
  
  }


}
